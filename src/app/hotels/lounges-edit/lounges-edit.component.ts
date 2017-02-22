import { FormArray } from '@angular/forms/src/model';
import { FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-lounges-edit',
  templateUrl: './lounges-edit.component.html',
  styleUrls: ['./lounges-edit.component.scss']
})
export class LoungesEditComponent implements OnInit {
  @Input('group') public myForm: FormGroup;
  @Input('name') public arrayName: string;
  @Output('onAdd') addLounge: EventEmitter<void> = new EventEmitter<void>();
  @Output('onRemove') removeLounge: EventEmitter<number> = new EventEmitter<number>();

  loungeArray: FormArray;

  constructor() { }

  ngOnInit() {
    this.loungeArray = <FormArray>this.myForm.controls[this.arrayName];
  }

  add(event: Event): void {
    event.preventDefault();
    this.addLounge.next();
  }

  remove(event: Event, index: number): void {
    event.preventDefault();
    this.removeLounge.next(index);
  }

}
