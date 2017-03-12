import { CanDeactivateGuard } from '../shared/can-deactivate-guard.service';
import { SharedModule } from '../shared/shared.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    CompaniesModule,
    UsersModule
  ],
  declarations: [
    AdminHomeComponent,
    AdminComponent,
  ],
  providers: [
    CanDeactivateGuard,
  ]
})
export class AdminModule { }
