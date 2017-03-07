import { SharedModule } from '../shared/shared.module';
import { CanDeactivateGuard } from '../shared/can-deactivate-guard.service';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminComponent } from './admin/admin.component';
import { CompaniesComponent } from './companies/companies.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [
    AdminHomeComponent,
    AdminComponent,
    CompaniesComponent
  ],
  providers: [
    CanDeactivateGuard
  ]
})
export class AdminModule { }
