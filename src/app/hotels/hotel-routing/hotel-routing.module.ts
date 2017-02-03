import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'app/hotels/home/home.component';
import { HotelsComponent } from 'app/hotels/hotels/hotels.component';

const hotelRoutes: Routes = [
  {
    path: '', component: HotelsComponent, children: [
      { path: '', component: HomeComponent }
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
