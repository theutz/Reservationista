import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelListComponent } from 'app/hotels/hotel-list/hotel-list.component';
import { HotelsComponent } from 'app/hotels/hotels/hotels.component';

const hotelRoutes: Routes = [
  {
    path: '', component: HotelsComponent, children: [
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
