import { CanDeactivateGuard } from '../../../shared/can-deactivate-guard.service';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UsersComponent } from '../users/users.component';
import { UserResolverService } from './user-resolver.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from '../user-list/user-list.component';

const routes: Routes = [
  {
    path: '', component: UsersComponent, children: [
      {
        path: 'all',
        component: UserListComponent,
        canDeactivate: [CanDeactivateGuard],
        data: { breadcrumb: 'Users' }
      },
      {
        path: 'edit/:id',
        component: UserEditComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          user: UserResolverService
        },
        data: { breadcrumb: 'Edit User' }
      },
      { path: '', redirectTo: '/admin/users/all', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
