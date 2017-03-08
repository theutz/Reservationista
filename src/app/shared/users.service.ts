import { Observable } from 'rxjs/Rx';
import { UserInfo } from './user-info';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {
  private _node: string = '/users';

  constructor(
    private _af: AngularFireDatabase
  ) { }

  create(user: User): firebase.Promise<void> {
    return this._af.object(this._userNode(user.uid)).update(user);
  }

  getAll(): Observable<Users> {
    return this._af.list(this._node);
  }

  private _userNode(key: string): string {
    return [this._node, key].join('/')
  }

}

export type Users = User[];

export interface User extends UserInfo {
}