import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { CanDeactivateGuard } from 'app/shared/can-deactivate-guard.service';

const adminRoutes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: 'home', component: AdminHomeComponent, canDeactivate: [CanDeactivateGuard], data: { breadcrumb: 'Home' } }
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