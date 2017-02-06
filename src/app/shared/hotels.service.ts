import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class HotelsService {
  private _hotelsNode: string = '/hotels';

  constructor(
    private _af: AngularFireDatabase
  ) { }

  getAll(): FirebaseListObservable<Hotels> {
    return this._af.list(this._hotelsNode);
  }

  get(id: string): FirebaseObjectObservable<Hotel> {
    return this._af.object(this._hotelsNode + '/' + id);
  }

}

export interface Hotel {
  name?: string;
  code?: string;
  address?: Address;
}

export type Hotels = Hotel[];

export interface Address {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
}