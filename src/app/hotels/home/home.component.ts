import { FirebaseListObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { HotelsService, Hotel, Hotels } from 'app/shared/hotels.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
