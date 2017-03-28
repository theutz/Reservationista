import { Subject } from 'rxjs/Rx';
import { NgSpinKitModule } from 'ng-spin-kit/dist/spinners';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Hotels, HotelsService } from '../../shared/hotels.service';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HotelListComponent } from './hotel-list.component';

class HotelsServiceSpy {
  getAll = jasmine.createSpy('getAll')
    .and.returnValue(new Subject<Hotels>().asObservable());
}

describe('HotelListComponent', () => {
  let component: HotelListComponent;
  let fixture: ComponentFixture<HotelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgSpinKitModule],
      declarations: [HotelListComponent],
      providers: [
        { provide: HotelsService, useClass: HotelsServiceSpy },
        { provide: Router, useClass: RouterTestingModule }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
