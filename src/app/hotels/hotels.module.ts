import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HotelRoutingModule } from 'app/hotels/hotel-routing/hotel-routing.module';
import { HotelsComponent } from './hotels/hotels.component';

@NgModule({
  imports: [
    CommonModule,
    HotelRoutingModule
  ],
  declarations: [
    HomeComponent,
    HotelsComponent
  ]
})
export class HotelsModule { }
