import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserEditComponent } from './user-edit/user-edit.component';
import { SharedModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user-routing/user-routing.module';
import { UsersComponent } from './users/users.component';
import { UsersService } from '../../shared/users.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserResolverService } from './user-routing/user-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    UsersComponent,
    UserListComponent,
    UserEditComponent
  ],
  providers: [
    UsersService,
    UserResolverService
  ]
})
export class UsersModule { }
