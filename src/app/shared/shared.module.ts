import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormControlTextInputComponent } from './form-control-text-input/form-control-text-input.component';
import { FormControlImageUploadComponent } from './form-control-image-upload/form-control-image-upload.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [NavbarComponent, FormControlTextInputComponent, FormControlImageUploadComponent],
  exports: [
    NavbarComponent,
    FormControlTextInputComponent,
    FormControlImageUploadComponent
  ]
})
export class SharedModule { }
