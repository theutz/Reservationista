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
  showStats: boolean = false;
  showRestaurants: boolean = false;
  showLounges: boolean = false;

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
      this._setShowStats(hotel);
      this._setShowRestaurants(hotel);
      this._setShowLounges(hotel);
    });
    return;
  }

  private _setShowStats(hotel: Hotel): void {
    let aStatExists = !!hotel.floorCount || !!hotel.roomCount || !!hotel.checkInTime
    !!hotel.checkOutTime || !!hotel.hoursToCancel || !!hotel.suiteCount;
    this.showStats = aStatExists;
  }

  private _setShowRestaurants(hotel: Hotel): void {
    this.showRestaurants = !!hotel.restaurants ? hotel.restaurants.length > 0 : false;
  }

  private _setShowLounges(hotel: Hotel): void {
    this.showLounges = !!hotel.lounges ? hotel.lounges.length > 0 : false;
  }

  private _setJumbotronStyles(hotel: any): void {
    if (!!hotel.images && hotel.images.thumbnail) {
      this.jumbotronStyle['background-image'] = 'url(' + hotel.images.thumbnail + ')';
      this.jumbotronBgExists = true;
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
