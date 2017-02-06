import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterModule } from '@angular/router';
import { HotelsService } from '../../shared/hotels.service';
import { HotelResolverService } from './hotel-resolver.service';
import { inject, TestBed } from '@angular/core/testing';
/* tslint:disable:no-unused-variable */

class HotelsServiceSpy {

}

describe('HotelResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      // imports: [RouterModule],
      providers: [
        HotelResolverService,
        { provide: HotelsService, useClass: HotelsServiceSpy },
        { provide: Router, useClass: RouterTestingModule }
      ]
    });
  });

  it('should ...', inject([HotelResolverService], (service: HotelResolverService) => {
    expect(service).toBeTruthy();
  }));
});
