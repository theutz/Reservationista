/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BrandingService } from './branding.service';

describe('BrandingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrandingService]
    });
  });

  it('should ...', inject([BrandingService], (service: BrandingService) => {
    expect(service).toBeTruthy();
  }));
});
