import { Observable } from 'rxjs/Rx';
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
  hotels$: Observable<Hotels>;
  loading: boolean = true;

  constructor(
    private _hs: HotelsService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._subscribeToHotels();
  }

  filterHotels(event: any) {
    let searchTerm = event.target.value;
    this.hotels$ = this._hs.search(searchTerm);
  }

  navigateToHotel(hotel: any, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this._router.navigateByUrl('hotels/details/' + hotel.$key);
    window.scrollTo(0, 0);
  }

  private _subscribeToHotels() {
    this.hotels$ = this._hs.getAll();
    this.hotels$.subscribe(hotels => {
      this.loading = false;
    });
  }
}
