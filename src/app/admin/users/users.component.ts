import { Router } from '@angular/router';
import { ToastrService } from 'toastr-ng2/toastr-service';
import { User, Users, UsersService } from '../../shared/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: Users = [];

  constructor(
    private _users: UsersService,
    private _toast: ToastrService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._users.getAll().subscribe(users => this.users = users);
  }

  editUser(user: any) {
    // console.log(user);
    this._router.navigateByUrl('/user/edit/' + user.$key);
  }

  deleteUser(user: User) {
    this._users.delete(user).then(() => {
      this._toast.success(`${user.displayName} deleted`, 'Success!')
    });
  }

}
