import { FormControlImageUploadComponent } from './form-control-image-upload/form-control-image-upload.component';
import { FormControlTextInputComponent } from './form-control-text-input/form-control-text-input.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2BootstrapModule
  ],
  declarations: [
    NavbarComponent,
    FormControlTextInputComponent,
    FormControlImageUploadComponent,
    BreadcrumbsComponent,
    FooterComponent,
  ],
  exports: [
    NavbarComponent,
    FormControlTextInputComponent,
    FormControlImageUploadComponent,
    BreadcrumbsComponent,
    FooterComponent
  ]
})
export class SharedModule { }
