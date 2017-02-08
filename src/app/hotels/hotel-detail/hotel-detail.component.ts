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

  loading: boolean = true;
  hotel$: FirebaseObjectObservable<Hotel>;
  hotel: Hotel;
  address: Address;
  hideAddrComma: boolean = false;
  hideCityComma: boolean = false;

  constructor(
    private _hs: HotelsService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._setHotel$();
    this._subscribeToHotel();
  }

  private _setShowStreetAddressTrailingCommas(address: Address): void {
    let strAddIsBlank = this._isBlank(address.streetAddress);
    let trailingIsBlank = this._isBlank(address.city) || this._isBlank(address.state) || this._isBlank(address.postalCode);

    this.hideAddrComma = strAddIsBlank && trailingIsBlank;
    return;
  }

  private _setShowCityTrailingComma(address: Address): void {
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
    });
    return;
  }

  private _subscribeToHotel(): void {
    this.hotel$.subscribe(hotel => {
      this.loading = false;
      this._setHotel(hotel);
      this._setAddress(hotel.address);
    });
    return;
  }

  private _setHotel(hotel: Hotel) {
    this.hotel = hotel;
  }

  private _setAddress(address: Address): void {
    this._setShowStreetAddressTrailingCommas(this.hotel.address);
    this._setShowCityTrailingComma(this.hotel.address);
  }
}
