import { Hotel, HotelsService } from '../../shared/hotels.service';
import { SubtitleService } from '../subtitle.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  submitted: boolean = false;

  constructor(
    private _subtitleService: SubtitleService,
    private _hotelService: HotelsService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this._subtitleService.setSubtitle('Edit');
    this._loadHotel();
  }

  save(model: Hotel, isValid: boolean): void {

  }

  isValid(control: AbstractControl): boolean {
    return control.valid || (control.pristine && !this.submitted);
  }

  formControlClasses(control: AbstractControl): { [key: string]: boolean } {
    return {
      "form-control": true,
      "form-control-danger": !this.isValid(control),
      "form-control-success": control.valid && !control.pristine
    };
  }

  formGroupClasses(control: AbstractControl): { [key: string]: boolean } {
    return {
      "form-group": true,
      "has-danger": !this.isValid(control),
      "has-success": control.valid && !control.pristine
    };
  }

  private _loadHotel(): void {
    this._route.data.subscribe((data: { hotel: any }) => {
      let key = data.hotel.$key;
      this.hotel$ = this._hotelService.get(key);
      this.hotel$.subscribe(hotel => {
        this.loading = false;
        this.hotel = hotel;
        this._configureForm();
        this._populateForm(hotel);
      })
    })
  }

  private _configureForm(): void {
    this.myForm = this._fb.group({
      name: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
      code: ['', [<any>Validators.required]],
      thumbnail: [''],
      address: this._fb.group({
        streetAddress: [''],
        city: ['', <any>Validators.required],
        state: ['', <any>Validators.required],
        postalCode: ['']
      })
    });
  }

  private _populateForm(hotel: Hotel) {
    const basicControls = [
      { name: 'name', value: hotel.name },
      { name: 'code', value: hotel.code }
    ];

    const address = hotel.address;
    const addressControls = [
      { name: 'streetAddress', value: address.streetAddress },
      { name: 'city', value: address.city },
      { name: 'state', value: address.state },
      { name: 'postalCode', value: address.postalCode }
    ];

    basicControls.map(control => this._bindControl(control.name, control.value));
    addressControls.map(control =>
      this._bindGroupControl('address', control.name, control.value)
    );
  }

  private _bindControl(name: string, value: any) {
    (<FormControl>this.myForm.controls[name]).setValue(value);
  }

  private _bindGroupControl(group: string, name: string, value: any) {
    (<FormGroup>this.myForm.controls[group]).controls[name].setValue(value);
  }
}
