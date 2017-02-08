/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubtitleService } from './subtitle.service';

describe('SubtitleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubtitleService]
    });
  });

  it('should ...', inject([SubtitleService], (service: SubtitleService) => {
    expect(service).toBeTruthy();
  }));
});
