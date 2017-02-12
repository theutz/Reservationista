import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class HotelsService {
  private _hotelsNode: string = '/hotels';

  constructor(
    private _af: AngularFireDatabase
  ) { }

  getAll(): FirebaseListObservable<Hotels> {
    return this._af.list(this._hotelsNode, { query: { orderByChild: 'name' } });
  }

  get(id: string): FirebaseObjectObservable<Hotel> {
    return this._af.object(this._hotelsNode + '/' + id);
  }

  update(id: string, model: Hotel): firebase.Promise<void> {
    return this._af.object(this._hotelsNode + '/' + id).update(model);
  }

}

export interface Hotel {
  name?: string;
  code?: string;
  address?: Address;
  restaurants?: Restaurants
}

export type Hotels = Hotel[];

export interface Address {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
}

export type Restaurants = Restaurant[];

export interface Restaurant {
  name: string;
  phoneNumber: string;
}