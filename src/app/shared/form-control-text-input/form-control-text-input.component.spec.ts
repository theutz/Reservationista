import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, Input } from '@angular/core';

import { FormControlTextInputComponent } from './form-control-text-input.component';

@Component({
  template: `
  <form [formGroup]="myForm" novalidate>
    <app-form-control-text-input [group]="myForm"></app-form-control-text-input>
  </form>`
})
class TestHostComponent {
  myForm: FormGroup;

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.myForm = this._fb.group({
      name: ['']
    });
  }
}

describe('FormControlTextInputComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        TestHostComponent,
        FormControlTextInputComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
