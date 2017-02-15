import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormControlTextInputComponent } from './form-control-text-input/form-control-text-input.component';
import { FormControlFileInputComponent } from './form-control-file-input/form-control-file-input.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [NavbarComponent, FormControlTextInputComponent, FormControlFileInputComponent],
  exports: [
    NavbarComponent,
    FormControlTextInputComponent,
  ]
})
export class SharedModule { }
