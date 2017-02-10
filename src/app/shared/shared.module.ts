import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormControlTextInputComponent } from './form-control-text-input/form-control-text-input.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NavbarComponent, FormControlTextInputComponent],
  exports: [NavbarComponent]
})
export class SharedModule { }
