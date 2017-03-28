import { BreadcrumbService } from '../breadcrumb.service';
import { HotelsComponent } from './hotels.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
/* tslint:disable:no-unused-variable */

class BreadcrumbServiceSpy {
  subtitle$ = jasmine.createSpyObj('subtitle$', ['subscribe'])
}

describe('HotelsComponent', () => {
  let component: HotelsComponent;
  let fixture: ComponentFixture<HotelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HotelsComponent],
      providers: [
        { provide: BreadcrumbService, useClass: BreadcrumbServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
