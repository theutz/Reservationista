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

    constructor(private authService: AuthService) {
    }

    login() {
        this.authService.login(this.email, this.password);
    }

    loginVia(provider: string, event: Event) {
        event.preventDefault();
        this.authService.loginViaProvider(provider).toPromise()
            .then(result => {
                console.log('LOGIN SUCCESS', result);
            });
    }

    isLoggedIn(): Observable<boolean> {
        return this.authService.isLoggedIn();
    }
}