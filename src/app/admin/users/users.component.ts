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
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this._users.getAll().subscribe(users => this.users = users);
  }

  deleteUser(user: User) {
    this._users.delete(user).then(() => {
      this._toast.success(`${user.displayName} deleted`, 'Success!')
    });
  }

}
