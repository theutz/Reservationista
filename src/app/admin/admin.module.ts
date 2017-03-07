import { CanDeactivateGuard } from '../shared/can-deactivate-guard.service';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminHomeComponent,
    AdminComponent
  ],
  providers: [
    CanDeactivateGuard
  ]
})
export class AdminModule { }
