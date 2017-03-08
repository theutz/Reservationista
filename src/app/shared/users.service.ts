import { Observable } from 'rxjs/Rx';
import { UserInfo } from './user-info';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { User as AuthUser } from "firebase";

@Injectable()
export class UsersService {
  private _node: string = '/users';

  constructor(
    private _af: AngularFireDatabase
  ) { }

  create(user: User): firebase.Promise<void> {
    return this._af.object(this._userNode(user.uid)).set(user);
  }

  update(user: User): firebase.Promise<void> {
    return this._af.object(this._userNode(user.uid)).update(user);
  }

  getAll(): Observable<Users> {
    return this._af.list(this._node);
  }

  mapAuthUserToAppUser(auth: AuthUser): User {
    return {
      isAnonymous: auth.isAnonymous,
      displayName: auth.displayName,
      email: auth.email,
      photoURL: auth.photoURL,
      providerId: auth.providerId,
      uid: auth.uid
    }
  }

  private _userNode(key: string): string {
    return [this._node, key].join('/')
  }

}

export type Users = User[];

export interface User extends UserInfo {
}