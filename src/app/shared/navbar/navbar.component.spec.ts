import { ToastrService } from 'toastr-ng2/toastr-service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ReplaySubject } from 'rxjs/Rx';
import { BrandingService } from '../branding.service';
import { NavbarComponent } from './navbar.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
/* tslint:disable:no-unused-variable */

class BrandingServiceSpy {
  private _titleSource = new ReplaySubject<string>();

  constructor() {
    this._titleSource.next('Reservationista');
  }

  title$ = this._titleSource.asObservable();
}

class AuthServiceSpy {
  isLoggedIn = jasmine.createSpy('isLoggedIn');
}

class RouterSpy {

}

class ToastrServiceSpy {

}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { provide: BrandingService, useClass: BrandingServiceSpy },
        { provide: AuthService, useClass: AuthServiceSpy },
        { provide: Router, useClass: RouterSpy },
        { provide: ToastrService, useClass: ToastrServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('title', () => {
    it(`should have as title 'Reservationista'`, async(() => {
      expect(component.title).toEqual('Reservationista');
    }));

    it('should render title in a h1 tag', async(() => {
      let compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.navbar-brand').textContent).toContain('Reservationista');
    }));
  });

});
