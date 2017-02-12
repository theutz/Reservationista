import { ToastrService } from 'toastr-ng2/toastr-service';
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
    private _fb: FormBuilder,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this._subtitleService.setSubtitle('Edit');
    this._loadHotel();
  }

  addRestaurant(): void {
    const control = <FormArray>this.myForm.controls['restaurants'];
    control.push(this._initRestaurants());
  }

  removeRestaurant(i: number): void {
    const control = <FormArray>this.myForm.controls['restaurants'];
    control.removeAt(i);
  }

  save(model: Hotel, isValid: boolean): void {
    if (isValid) {
      this._hotelService.update(this.hotel$.$ref.key, model).then(() => {
        this._toast.success(model.name + ' update complete', "Success!");
      });
    }
  }

  private _loadHotel(): void {
    this._route.data.subscribe((data: { hotel: any }) => {
      let key = data.hotel.$key;
      this.hotel$ = this._hotelService.get(key);
      this.hotel$.subscribe(hotel => {
        this.loading = false;
        this.hotel = hotel;
        this._initForms();
      })
    })
  }

  private _initForms(): void {
    this.myForm = this._fb.group({
      name: [this.hotel.name, [Validators.required, Validators.minLength(5)]],
      code: [this.hotel.code, [Validators.required]],
      address: this._initAddress(),
      restaurants: this._initRestaurants()
    })
  }

  private _initAddress(): FormGroup {
    return this._fb.group({
      streetAddress: [this.hotel.address.streetAddress, [Validators.required]],
      city: [this.hotel.address.city, [Validators.required]],
      state: [this.hotel.address.state, [Validators.required]],
      postalCode: [this.hotel.address.postalCode, [Validators.required]],
    })
  }

  private _initRestaurants(): FormArray {
    let controls = [];
    this.hotel.restaurants.map(restaurant => {
      controls.push(this._fb.group({
        name: [restaurant.name, [Validators.required]],
        phoneNumber: [restaurant.phoneNumber]
      }));
    });
    return this._fb.array(controls)
  }

}
