import { ToastrService } from 'toastr-ng2/toastr-service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '../../shared/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  myForm: FormGroup;
  user: User;
  loading: boolean = true;

  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _userService: UsersService,
    private _location: Location,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this._loadUser();
  }

  save(model: User, isValid: boolean): void {
    if (isValid) {
      this._userService.update(model)
        .then(() => {
          this._toast.success(`Saved ${model.displayName}`, `Success!`);
          this._location.back();
        })
    }
  }

  goBack(event: Event) {
    event.preventDefault();
    this._location.back();
  }

  private _loadUser() {
    this._route.data.subscribe((data: { user: any }) => {
      this._userService.get(data.user.uid)
        .subscribe((user: User) => {
          this.user = user;
          this.loading = false;
          this._initForm();
        })
    })
  }

  private _initForm() {
    this.myForm = this._fb.group({
      name: [this.user.displayName, [Validators.required]]
    })
  }

}
