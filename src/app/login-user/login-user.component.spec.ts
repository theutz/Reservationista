import { ToastrService } from 'toastr-ng2/toastr-service';
import { LoginUserComponent } from './login-user.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/auth.service';
import { AsyncSubject } from 'rxjs';
/* tslint:disable:no-unused-variable */

class RouterSpy {

}

class ToastrServiceSpy {

}

describe('LoginUserComponent', () => {
    let component: LoginUserComponent;
    let fixture: ComponentFixture<LoginUserComponent>;

    beforeEach(async(() => {
        let authServiceStub = {
            login: function () {
                return true
            },
            logout: function () {
                return true
            },
            isLoggedIn: function () {
                return new AsyncSubject<boolean>();
            }
        };

        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [LoginUserComponent],
            providers: [
                { provide: AuthService, useValue: authServiceStub },
                { provide: Router, useClass: RouterSpy },
                { provide: ToastrService, useClass: ToastrServiceSpy }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
