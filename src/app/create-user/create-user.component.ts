import { Router } from '@angular/router';
import { ToastrService } from 'toastr-ng2/toastr-service';
import { UsersService } from '../shared/users.service';
import { AuthService } from '../shared/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  email: string;
  password: string;
  displayName: string;

  constructor(
    private _auth: AuthService,
    private _users: UsersService,
    private _toast: ToastrService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  signUp(event: Event) {
    event.preventDefault();
    this._auth.createUser(this.email, this.password, this.displayName)
      .subscribe(auth => {
        this._toast.success(`Email: ${auth.auth.email}`, "User Created!")
        this._router.navigateByUrl('/hotels');
      });
  }
}
