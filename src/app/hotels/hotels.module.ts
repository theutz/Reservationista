import { TabsModule } from 'ng2-bootstrap/tabs';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { NgSpinKitModule } from 'ng-spin-kit';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';
import { SubtitleService } from './subtitle.service';
import { RestaurantsEditComponent } from './restaurants-edit/restaurants-edit.component';

@NgModule({
  imports: [
    CommonModule,
    HotelRoutingModule,
    NgSpinKitModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule
  ],
  declarations: [
    HotelListComponent,
    HotelsComponent,
    SearchComponent,
    HotelDetailComponent,
    HotelEditComponent,
    RestaurantsEditComponent
  ],
  providers: [
    HotelsService,
    HotelResolverService,
    CanDeactivateGuard,
    SubtitleService,
    FormBuilder
  ]
})
export class HotelsModule { }
