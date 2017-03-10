import { CompanyEditComponent } from '../company-edit/company-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { CanDeactivateGuard } from 'app/shared/can-deactivate-guard.service';
import { CompaniesComponent } from '../companies/companies.component';
import { UsersComponent } from '../users/users.component';
import { CompanyResolverService } from '../company-resolver.service';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserResolverService } from 'app/shared/user-resolver.service';

const adminRoutes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {
        path: 'home',
        component: AdminHomeComponent,
        canDeactivate: [CanDeactivateGuard],
        data: { breadcrumb: 'Home' }
      },
      {
        path: 'companies',
        component: CompaniesComponent,
        canDeactivate: [CanDeactivateGuard],
        data: { breadcrumb: 'Companies' }
      },
      {
        path: 'company/edit/:id',
        component: CompanyEditComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          company: CompanyResolverService
        },
        data: { breadcrumb: 'Edit Company' }
      },
      {
        path: 'users',
        component: UsersComponent,
        canDeactivate: [CanDeactivateGuard],
        data: { breadcrumb: 'Users' }
      },
      {
        path: 'user/edit/:id',
        component: UserEditComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          user: UserResolverService
        },
        data: { breadcrumb: 'Edit User' }
      },
      { path: '', redirectTo: '/admin/home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AdminRoutingModule { }