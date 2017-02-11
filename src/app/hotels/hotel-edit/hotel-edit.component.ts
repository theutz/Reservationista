import { FormArray } from '@angular/forms/src/model';
import { Hotel, HotelsService } from '../../shared/hotels.service';
import { SubtitleService } from '../subtitle.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.scss']
})
export class HotelEditComponent implements OnInit {
  myForm: FormGroup;
  loading: boolean = true;
  hotel$: FirebaseObjectObservable<Hotel>;
  hotel: Hotel;

  constructor(
    private _subtitleService: SubtitleService,
    private _hotelService: HotelsService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    // Load Model
    this._subtitleService.setSubtitle('Edit');
    this._loadHotel();

    // Initialize forms
    this.myForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      restaurants: this._fb.array([
        this._initRestaurants()
      ])
    })
  }

  addRestaurant(): void {
    const control = <FormArray>this.myForm.controls['restaurants'];
    control.push(this._initRestaurants());
  }

  removeRestaurant(i: number): void {
    const control = <FormArray>this.myForm.controls['restaurants'];
    control.removeAt(i);
  }

  save(model: Hotel): void {
    console.log(model);
  }

  private _initRestaurants(): FormGroup {
    return this._fb.group({
      name: ['', [Validators.required]],
      phoneNumber: ['']
    })
  }

  private _loadHotel(): void {
    this._route.data.subscribe((data: { hotel: any }) => {
      let key = data.hotel.$key;
      this.hotel$ = this._hotelService.get(key);
      this.hotel$.subscribe(hotel => {
        this.loading = false;
        this.hotel = hotel;
      })
    })
  }
}
