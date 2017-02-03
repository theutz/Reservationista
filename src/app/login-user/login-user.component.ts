import { Router } from '@angular/router';
import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "app/shared/auth.service";

@Component({
    selector: 'app-login-user',
    templateUrl: './login-user.component.html',
    styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {

    email: string;
    password: string;

    constructor(
        private _authService: AuthService,
        private _router: Router
    ) {
    }

    login() {
        this._authService.login(this.email, this.password);
    }

    loginVia(provider: string, event: Event) {
        event.preventDefault();
        this._authService.loginViaProvider(provider)
            .subscribe(result => {
                this._router.navigateByUrl('/home');
            });
    }

    isLoggedIn(): Observable<boolean> {
        return this._authService.isLoggedIn();
    }
}