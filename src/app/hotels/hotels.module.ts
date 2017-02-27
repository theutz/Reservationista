import { CanDeactivateGuard } from '../shared/can-deactivate-guard.service';
import { HotelsService } from '../shared/hotels.service';
import { SharedModule } from '../shared/shared.module';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelResolverService } from './hotel-routing/hotel-resolver.service';
import { HotelsComponent } from './hotels/hotels.component';
import { LoungesEditComponent } from './lounges-edit/lounges-edit.component';
import { RestaurantsEditComponent } from './restaurants-edit/restaurants-edit.component';
import { SubtitleService } from './subtitle.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotelRoutingModule } from 'app/hotels/hotel-routing/hotel-routing.module';
import { AccordionModule } from 'ng2-bootstrap/accordion';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { TypeaheadModule } from 'ng2-bootstrap/typeahead';

@NgModule({
  imports: [
    CommonModule,
    HotelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule,
    SharedModule,
    AccordionModule,
    TypeaheadModule,
  ],
  declarations: [
    HotelListComponent,
    HotelsComponent,
    HotelDetailComponent,
    HotelEditComponent,
    RestaurantsEditComponent,
    LoungesEditComponent
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
