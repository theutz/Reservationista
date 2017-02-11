import { FormControl, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-control-text-input',
  templateUrl: './form-control-text-input.component.html',
  styleUrls: ['./form-control-text-input.component.scss'],
})
export class FormControlTextInputComponent implements OnInit {
  @Input('group') myForm: FormGroup
  @Input('name') controlName: string = '';
  @Input() label: string = '';
  @Input() invalidMessage: string = '';
  @Input() control: FormControl;

  constructor() { }

  ngOnInit() {
    this.control = <FormControl>this.myForm.controls[this.controlName];
  }

  formGroupClasses(): { [key: string]: boolean } {
    return {
      "form-group": true,
      "has-danger": !this.control.valid
    }
  }

}
