import { AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { HotelsService, Hotel, Hotels } from 'app/shared/hotels.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit {

  hotels: Hotels;
  hotels$: FirebaseListObservable<Hotels>;
  loading: boolean = true;

  constructor(
    private _hs: HotelsService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._subscribeToHotels();
  }

  private _subscribeToHotels() {
    this._hs.getAll().subscribe(hotels => {
      this.hotels = hotels;
      this.loading = false;
    });;
  }

  navigateToHotel(hotel: any): void {
    this._router.navigateByUrl('hotels/details/' + hotel.$key);
  }

}