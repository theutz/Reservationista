import { HotelsService } from '../shared/hotels.service';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HotelRoutingModule } from 'app/hotels/hotel-routing/hotel-routing.module';
import { HotelsComponent } from './hotels/hotels.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    CommonModule,
    HotelRoutingModule
  ],
  declarations: [
    HotelListComponent,
    HotelsComponent,
    SearchComponent
  ],
  providers: [HotelsService]
})
export class HotelsModule { }
