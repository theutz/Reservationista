import { BreadcrumbService } from './breadcrumb.service';
import { inject, TestBed } from '@angular/core/testing';
/* tslint:disable:no-unused-variable */

describe('SubtitleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BreadcrumbService]
    });
  });

  it('should ...', inject([BreadcrumbService], (service: BreadcrumbService) => {
    expect(service).toBeTruthy();
  }));
});
