import { FirebaseApp } from 'angularfire2/tokens';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class HotelsService {
  private _hotelsNode: string = '/hotels';
  private _storageRef: firebase.storage.Reference;

  constructor(
    private _af: AngularFireDatabase,
    @Inject(FirebaseApp) firebaseApp: firebase.app.App
  ) {
    this._storageRef = firebaseApp.storage().ref();
  }

  getAll(): FirebaseListObservable<Hotels> {
    return this._af.list(this._hotelsNode, { query: { orderByChild: 'name' } });
  }

  get(id: string): FirebaseObjectObservable<Hotel> {
    return this._af.object(this._hotelsNode + '/' + id);
  }

  update(id: string, model: Hotel): firebase.Promise<void> {
    return this._af.object(this._hotelsNode + '/' + id).update(model);
  }

  getImageUrl(id: string, fileName: string): firebase.Promise<any> {
    return this._storageRef
      .child(this._hotelsNode)
      .child(id)
      .child(fileName)
      .getDownloadURL();
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