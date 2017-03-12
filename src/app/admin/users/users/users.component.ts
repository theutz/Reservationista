import { Router } from '@angular/router';
import { ToastrService } from 'toastr-ng2/toastr-service';
import { User, Users, UsersService } from 'app/shared/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
}
