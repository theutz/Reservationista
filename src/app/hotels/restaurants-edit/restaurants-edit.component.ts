import { FormArray } from '@angular/forms/src/model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-restaurants-edit',
  templateUrl: './restaurants-edit.component.html',
  styleUrls: ['./restaurants-edit.component.scss']
})
export class RestaurantsEditComponent implements OnInit {
  @Input('group') public myForm: FormGroup;
  @Input('name') public arrayName: string;
  @Output('onAdd') addRestaurant: EventEmitter<void> = new EventEmitter<void>();
  @Output('onRemove') removeRestaurant: EventEmitter<number> = new EventEmitter<number>();

  restaurantArray: FormArray;

  constructor() { }

  ngOnInit() {
    this.restaurantArray = <FormArray>this.myForm.controls[this.arrayName];
  }

  add(event: Event): void {
    event.preventDefault();
    this.addRestaurant.next();
  }

  remove(event: Event, index: number): void {
    event.preventDefault();
    this.removeRestaurant.next(index);
  }

}
