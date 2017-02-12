import { FormArray } from '@angular/forms/src/model';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-restaurants-edit',
  templateUrl: './restaurants-edit.component.html',
  styleUrls: ['./restaurants-edit.component.scss']
})
export class RestaurantsEditComponent implements OnInit {
  @Input('group') public myForm: FormGroup;
  @Input('name') public arrayName: string;
  restaurantArray: FormArray;

  constructor() { }

  ngOnInit() {
    this.restaurantArray = <FormArray>this.myForm.controls[this.arrayName];
  }

}
