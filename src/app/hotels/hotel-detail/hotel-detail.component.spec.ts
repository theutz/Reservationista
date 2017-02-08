import { SubtitleService } from '../subtitle.service';
import { NgSpinKitModule } from 'ng-spin-kit/dist/spinners';
import { Subject } from 'rxjs/Rx';
import { Observable } from '@angular-cli/ast-tools/node_modules/rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel, HotelsService } from '../../shared/hotels.service';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HotelDetailComponent } from './hotel-detail.component';

class HotelsServiceSpy {
  get = jasmine.createSpy('get')
    .and.returnValue(new Subject<Hotel>().asObservable());
}

class ActivatedRouteSpy {
  data = jasmine.createSpyObj('data', ['subscribe']);
}

class RouterSpy { }

class SubtitleServiceSpy {
  setSubtitle = jasmine.createSpy('setSubtitle');
}

describe('HotelDetailComponent', () => {
  let component: HotelDetailComponent;
  let fixture: ComponentFixture<HotelDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgSpinKitModule],
      declarations: [HotelDetailComponent],
      providers: [
        { provide: HotelsService, useClass: HotelsServiceSpy },
        { provide: ActivatedRoute, useClass: ActivatedRouteSpy },
        { provide: Router, useClass: RouterSpy },
        { provide: SubtitleService, useClass: SubtitleServiceSpy }
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
