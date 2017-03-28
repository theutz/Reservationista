import { CanDeactivateGuard } from '../../shared/can-deactivate-guard.service';
import { HotelResolverService } from './hotel-resolver.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelDetailComponent } from 'app/hotels/hotel-detail/hotel-detail.component';
import { HotelEditComponent } from 'app/hotels/hotel-edit/hotel-edit.component';
import { HotelListComponent } from 'app/hotels/hotel-list/hotel-list.component';
import { HotelsComponent } from 'app/hotels/hotels/hotels.component';

const hotelRoutes: Routes = [
  {
    path: '', component: HotelsComponent, children: [
      {
        path: 'details/:id',
        component: HotelDetailComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          hotel: HotelResolverService
        },
        data: {
          breadcrumb: 'Details'
        }
      },
      {
        path: 'edit/:id',
        component: HotelEditComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          hotel: HotelResolverService
        },
        data: {
          breadcrumb: 'Edit'
        }
      },
      { path: '', component: HotelListComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(hotelRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
  ],
  providers: []
})
export class HotelRoutingModule { }
