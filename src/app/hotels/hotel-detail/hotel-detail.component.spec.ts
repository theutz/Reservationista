import { Subject } from 'rxjs/Rx';
import { Observable } from '@angular-cli/ast-tools/node_modules/rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { Hotel, HotelsService } from '../../shared/hotels.service';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HotelDetailComponent } from './hotel-detail.component';

class HotelsServiceSpy {
  get = jasmine.createSpy('get').and.returnValue(new Subject<Hotel>().asObservable());
}

class ActivatedRouteSpy {
  data = jasmine.createSpyObj('data', ['subscribe']);
}

describe('HotelDetailComponent', () => {
  let component: HotelDetailComponent;
  let fixture: ComponentFixture<HotelDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HotelDetailComponent],
      providers: [
        { provide: HotelsService, useClass: HotelsServiceSpy },
        { provide: ActivatedRoute, useClass: ActivatedRouteSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
