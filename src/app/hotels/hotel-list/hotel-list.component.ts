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

  hotels: FirebaseListObservable<Hotels>;

  constructor(
    private _hs: HotelsService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._subscribeToHotels();
  }

  private _subscribeToHotels() {
    this.hotels = this._hs.getAll();
  }

  navigateToHotel(hotel: any): void {
    this._router.navigateByUrl('hotels/details/' + hotel.$key);
  }

}
