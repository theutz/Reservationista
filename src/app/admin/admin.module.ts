import { CanDeactivateGuard } from '../shared/can-deactivate-guard.service';
import { SharedModule } from '../shared/shared.module';
import { UsersService } from '../shared/users.service';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UsersComponent } from './users/users.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserResolverService } from 'app/shared/user-resolver.service';
import { ModalModule } from 'ng2-bootstrap/modal';
import { CompaniesModule } from './companies/companies.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    CompaniesModule
  ],
  declarations: [
    AdminHomeComponent,
    AdminComponent,
    UsersComponent,
    UserEditComponent
  ],
  providers: [
    CanDeactivateGuard,
    UsersService,
    UserResolverService
  ]
})
export class AdminModule { }
