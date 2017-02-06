import { CanDeactivateGuard } from '../shared/can-deactivate-guard.service';
import { HotelResolverService } from './hotel-routing/hotel-resolver.service';
import { HotelsService } from '../shared/hotels.service';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HotelRoutingModule } from 'app/hotels/hotel-routing/hotel-routing.module';
import { HotelsComponent } from './hotels/hotels.component';
import { SearchComponent } from './search/search.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';

@NgModule({
  imports: [
    CommonModule,
    HotelRoutingModule
  ],
  declarations: [
    HotelListComponent,
    HotelsComponent,
    SearchComponent,
    HotelDetailComponent
  ],
  providers: [
    HotelsService,
    HotelResolverService,
    CanDeactivateGuard
  ]
})
export class HotelsModule { }
