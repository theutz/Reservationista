import { Hotel, HotelsService } from '../../shared/hotels.service';
import { BreadcrumbService } from '../breadcrumb.service';
import { HotelDetailComponent } from './hotel-detail.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
/* tslint:disable:no-unused-variable */


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
        { provide: BreadcrumbService, useClass: SubtitleServiceSpy }
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
