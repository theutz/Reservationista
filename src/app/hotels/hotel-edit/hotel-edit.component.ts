import { Hotel, HotelsService, Lounge, Restaurant } from '../../shared/hotels.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms/src/model';
import { ActivatedRoute } from '@angular/router';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { ToastrService } from 'toastr-ng2/toastr-service';

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
    private _hotelService: HotelsService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _toast: ToastrService,
    private _location: Location,
  ) { }

  ngOnInit() {
    this._loadHotel();
  }

  // Restaurants
  addRestaurant(): void {
    const control = <FormArray>this.myForm.controls['restaurants'];
    control.push(this._initRestaurant());
  }
  removeRestaurant(i: number): void {
    const control = <FormArray>this.myForm.controls['restaurants'];
    control.removeAt(i);
  }

  // Lounges
  addLounge(): void {
    const control = <FormArray>this.myForm.controls['lounges'];
    control.push(this._initLounge());
  }
  removeLounge(i: number): void {
    const control = <FormArray>this.myForm.controls['lounges'];
    control.removeAt(i);
  }

  // Images
  thumbnailChange(file: File): void {
    this.loading = true;
    this._uploadImage(file, 'thumbnail').then(() => {
    });;
  }

  removeThumbnail(event: Event): void {
    event.preventDefault();
    this._hotelService.removeImage(this.hotel$.$ref.key, 'thumbnail', this.hotel.images.thumbnail).then(() => {
      this._toast.success('Deleted thumbnail', 'Success!');
    });
  }

  goBack(event: Event) {
    event.preventDefault();
    this._location.back();
  }

  save(model: Hotel, isValid: boolean): void {
    if (isValid) {
      this._hotelService.update(this.hotel$.$ref.key, model).then(() => {
        this._toast.success(model.name + ' update complete', "Success!");
        this._location.back();
      });
    }
  }

  // PRIVATE
  private _uploadImage(file: File, imgType: string): firebase.Promise<any> {
    return this._hotelService.uploadImage(this.hotel$.$ref.key, imgType, file)
      .then(() => {
        this.loading = false;
        this._toast.success(file.name + ' upload complete!', 'Success!')
      })
  }

  private _loadHotel(): void {
    this._route.data.subscribe((data: { hotel: any }) => {
      let key = data.hotel.$key;
      this.hotel$ = this._hotelService.get(key);
      this.hotel$.subscribe((hotel: Hotel) => {
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
      floorCount: [this.hotel.floorCount, [Validators.required]],
      roomCount: [this.hotel.roomCount, [Validators.required]],
      suiteCount: [this.hotel.suiteCount, [Validators.required]],
      checkInTime: [this.hotel.checkInTime, [Validators.required]],
      checkOutTime: [this.hotel.checkOutTime, [Validators.required]],
      hoursToCancel: [this.hotel.hoursToCancel, [Validators.required]],
      address: this._initAddress(),
      restaurants: this._initRestaurants(),
      lounges: this._initLounges(),
      images: this._initImages()
    })
  }

  private _initImages(): FormGroup {
    return this._fb.group({
      thumbnail: [this.hotel.images.thumbnail]
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

  private _initRestaurant(restaurant?: Restaurant): FormGroup {
    restaurant = !!restaurant ? restaurant : { name: '', phoneNumber: '' };
    return this._fb.group({
      name: [restaurant.name, [Validators.required]],
      phoneNumber: [restaurant.phoneNumber]
    });
  }

  private _initRestaurants(): FormArray {
    let controls = [];
    if (!!this.hotel.restaurants) {
      this.hotel.restaurants.map(restaurant => {
        controls.push(this._initRestaurant(restaurant));
      });
    }
    return this._fb.array(controls)
  }

  private _initLounges(): FormArray {
    let controls = [];
    if (!!this.hotel.lounges) {
      this.hotel.lounges.map(lounge => {
        controls.push(this._initLounge(lounge));
      })
    }
    return this._fb.array(controls);
  }

  private _initLounge(lounge?: Lounge): FormGroup {
    lounge = !!lounge ? lounge : { name: '', phoneNumber: '' };
    return this._fb.group({
      name: [lounge.name, [Validators.required]],
      phoneNumber: [lounge.phoneNumber]
    });
  }

}
