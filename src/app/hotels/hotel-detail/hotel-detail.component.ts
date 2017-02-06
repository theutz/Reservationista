import { ActivatedRoute } from '@angular/router';
import { Hotel, HotelsService } from '../../shared/hotels.service';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {

  hotel$: FirebaseObjectObservable<Hotel>;

  constructor(
    private _hs: HotelsService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._setHotel();
  }

  private _setHotel() {
    this._route.data.subscribe((data: { hotel: any }) => {
      this.hotel$ = this._hs.get(data.hotel.$key);
    })
  }

}
