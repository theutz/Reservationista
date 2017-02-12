import { SubtitleService } from '../subtitle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Address, Hotel, HotelsService } from '../../shared/hotels.service';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {

  loading: boolean = true;
  hotel$: FirebaseObjectObservable<Hotel>;
  hotel: Hotel;
  address: Address;
  hideAddrComma: boolean = false;
  hideCityComma: boolean = false;
  jumbotronStyle: { [key: string]: string } = {
    'background-image': null,
    'background-position': 'center',
    'background-size': 'cover'
  };
  jumbotronBgExists: boolean = false;

  constructor(
    private _hs: HotelsService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _subtitleService: SubtitleService
  ) { }

  ngOnInit() {
    this._setHotel$();
    this._subtitleService.setSubtitle('Details');
  }

  edit(event: Event) {
    event.preventDefault();
    this._router.navigateByUrl('/hotels/edit/' + this.hotel$.$ref.key);
  }

  private _setHideAddrComma(address: Address): void {
    let strAddIsBlank = this._isBlank(address.streetAddress);
    let trailingIsBlank = this._isBlank(address.city) || this._isBlank(address.state) || this._isBlank(address.postalCode);

    this.hideAddrComma = strAddIsBlank && trailingIsBlank;
    return;
  }

  private _setHideCityComma(address: Address): void {
    let cityExists = this._isBlank(address.city);
    let trailingExists = this._isBlank(address.state) || this._isBlank(address.postalCode);

    this.hideCityComma = cityExists && trailingExists;
    return;
  }

  private _isBlank(str: string): boolean {
    return str === null || (/^\s*?$/).test(str) || !!str == false;
  }

  private _setHotel$(): void {
    this._route.data.subscribe((data: { hotel: any }) => {
      this.hotel$ = this._hs.get(data.hotel.$key);
      this._subscribeToHotel();
    });
    return;
  }

  private _subscribeToHotel(): void {
    this.hotel$.subscribe(hotel => {
      this.loading = false;
      this._setHotel(hotel);
      this._setAddress(hotel.address);
      this._setJumbotronStyles(hotel);
    });
    return;
  }

  private _setJumbotronStyles(hotel: any): void {
    if (!!hotel.images && !!hotel.images.thumbnail) {
      this._hs
        .getImageUrl(hotel.$key, hotel.images.thumbnail)
        .then(url => {
          console.log('IMG URL', url);
          this.jumbotronStyle['background-image'] = 'url(' + url + ')';
          this.jumbotronBgExists = true;
        });
    }
  }

  private _setHotel(hotel: Hotel) {
    this.hotel = hotel;
  }

  private _setAddress(address: Address): void {
    this.address = address;
    this._setHideAddrComma(this.hotel.address);
    this._setHideCityComma(this.hotel.address);
  }
}
