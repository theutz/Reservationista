import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { User, UsersService } from './users.service';
import { Resolve } from '@angular/router/src/interfaces';
import { Injectable } from '@angular/core';

@Injectable()
export class UserResolverService implements Resolve<User> {

  constructor(
    private _users: UsersService,
    private _router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<User> {
    let id = route.params['id'];

    return this._users.get(id)
      .first()
      .toPromise()
      .then(user => {
        if (user) {
          return user;
        } else {
          this._router.navigate(['/users']);
          return null;
        }
      })
  }
}
