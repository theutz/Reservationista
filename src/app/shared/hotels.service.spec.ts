import { AngularFireDatabase } from 'angularfire2/database';
import { HotelsService } from './hotels.service';
import { inject, TestBed } from '@angular/core/testing';
/* tslint:disable:no-unused-variable */

class AfDbSpy {
}

describe('HotelsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HotelsService,
        { provide: AngularFireDatabase, useClass: AfDbSpy }
      ]
    });
  });

  it('should ...', inject([HotelsService], (service: HotelsService) => {
    expect(service).toBeTruthy();
  }));
});
