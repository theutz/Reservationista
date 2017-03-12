import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { AdminComponent } from '../admin/admin.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UsersComponent } from '../users/users.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'app/shared/can-deactivate-guard.service';
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
        loadChildren: 'app/admin/companies/companies.module#CompaniesModule',
        data: { preload: true, breadcrumb: 'Companies' }
      },
      {
        path: 'users',
        loadChildren: 'app/admin/users/users.module#UsersModule',
        data: { preload: true, breadcrumb: 'Users' }
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