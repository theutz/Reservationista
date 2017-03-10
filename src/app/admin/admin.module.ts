import { ModalModule } from 'ng2-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CanDeactivateGuard } from '../shared/can-deactivate-guard.service';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminComponent } from './admin/admin.component';
import { CompaniesComponent } from './companies/companies.component';
import { UsersComponent } from './users/users.component';
import { UsersService } from '../shared/users.service';
import { CompaniesService } from '../shared/companies.service';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { CompanyResolverService } from './company-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule
  ],
  declarations: [
    AdminHomeComponent,
    AdminComponent,
    CompaniesComponent,
    UsersComponent,
    CompanyEditComponent
  ],
  providers: [
    CanDeactivateGuard,
    UsersService,
    CompaniesService,
    CompanyResolverService
  ]
})
export class AdminModule { }
