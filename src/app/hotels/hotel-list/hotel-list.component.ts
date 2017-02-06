import { FirebaseListObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { HotelsService, Hotel, Hotels } from 'app/shared/hotels.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  hotels: FirebaseListObservable<Hotels>;

  constructor(
    private _hs: HotelsService
  ) { }

  ngOnInit() {
  }

  private _subscribeToHotels() {
    this.hotels = this._hs.getAll();
  }

}
