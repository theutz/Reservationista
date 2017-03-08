import { Users, UsersService } from '../../shared/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: Users = [];

  constructor(
    private _users: UsersService
  ) { }

  ngOnInit() {
    this._users.getAll().subscribe(users => this.users = users);
  }

}
