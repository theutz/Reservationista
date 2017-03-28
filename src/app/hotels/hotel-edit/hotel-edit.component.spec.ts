import { BreadcrumbService } from '../breadcrumb.service';
import { HotelEditComponent } from './hotel-edit.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
/* tslint:disable:no-unused-variable */

class BreadcrumbServiceSpy {
  setSubtitle = jasmine.createSpy('setSubtitle');
}

describe('HotelEditComponent', () => {
  let component: HotelEditComponent;
  let fixture: ComponentFixture<HotelEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HotelEditComponent],
      providers: [
        { provide: BreadcrumbService, useClass: BreadcrumbServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
