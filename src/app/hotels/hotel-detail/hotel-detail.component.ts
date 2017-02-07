import { ActivatedRoute } from '@angular/router';
import { Address, Hotel, HotelsService } from '../../shared/hotels.service';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {

  hotel$: FirebaseObjectObservable<Hotel>;
  address: Address;
  hideAddrComma: boolean = false;
  hideCityComma: boolean = false;

  constructor(
    private _hs: HotelsService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._setHotel();
    this.hotel$.subscribe(hotel => {
      this.address = hotel.address;
      this._setShowStreetAddressTrailingCommas(hotel.address);
      this._setShowCityTrailingComma(hotel.address);
    })
  }

  private _setShowStreetAddressTrailingCommas(address: Address): void {
    let strAddIsBlank = this._isBlank(address.streetAddress);
    let trailingIsBlank = this._isBlank(address.city) || this._isBlank(address.state) || this._isBlank(address.postalCode);
    this.hideAddrComma = strAddIsBlank && trailingIsBlank;
  }

  private _setShowCityTrailingComma(address: Address): void {
    let cityExists = this._isBlank(address.city);
    let trailingExists = this._isBlank(address.state) || this._isBlank(address.postalCode);
    this.hideCityComma = cityExists && trailingExists;
  }

  private _isBlank(str: string): boolean {
    return str === null || (/^\s*?$/).test(str) || !!str == false;
  }

  private _setHotel() {
    this._route.data.subscribe((data: { hotel: any }) => {
      this.hotel$ = this._hs.get(data.hotel.$key);
    })
  }

}
