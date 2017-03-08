import { Observable } from 'rxjs';
import { FirebaseApp } from 'angularfire2/tokens';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Inject, Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';

@Injectable()
export class HotelsService {
  private _node: string = '/hotels';
  private _storageRef: firebase.storage.Reference;

  constructor(
    private _af: AngularFireDatabase,
    @Inject(FirebaseApp) private _firebaseApp: firebase.app.App
  ) {
    this._storageRef = _firebaseApp.storage().ref();
  }

  getAll(): FirebaseListObservable<Hotels> {
    return this._af.list(this._node, { query: { orderByChild: 'name' } });
  }

  get(id: string): FirebaseObjectObservable<Hotel> {
    return this._af.object(this._node + '/' + id);
  }

  create(hotel: Hotel): FirebaseObjectObservable<Hotel> {
    let key = this._af.list(this._node).push(hotel).key;
    return this._af
      .object(this._node + '/' + key) as FirebaseObjectObservable<Hotel>;
  }

  update(id: string, model: Hotel): firebase.Promise<void> {
    return this._af.object(this._node + '/' + id).update(model);
  }

  delete(id: string): firebase.Promise<void> {
    return this._af.object(this._node + '/' + id).remove();
  }

  getImageUrl(hotelId: string, fileName: string): firebase.Promise<string> {
    return this._storageRef
      .child(this._node)
      .child(hotelId)
      .child(fileName)
      .getDownloadURL();
  }

  uploadImage(hotelId: string, imageType: string, file: File): firebase.Promise<any> {
    let uuid = UUID.UUID();
    let ref = this._storageRef.child(this._node).child(hotelId);
    let storageName = imageType + '_' + uuid;

    return ref.child(storageName).put(file)
      .then(result => {
        let imgNames: Images = {};
        imgNames[imageType] = result.downloadURL;

        // Update thumbnail
        this._af.object(this._node + '/' + hotelId + '/images')
          .update(imgNames);
      });
  }

  removeImage(hotelId: string, imageType: string, fileName: string) {
    return this._storageRef
      .child(this._node)
      .child(hotelId)
      .child(fileName)
      .delete().then(() => {
        let hotel: Hotel = { images: {} };
        hotel.images[imageType] = null;
        return this.update(hotelId, hotel);
      })
  }

  search(term: string): Observable<any> {
    return this._af.list(this._node).map(hotels => {
      return hotels.filter((hotel: Hotel) => {
        let regex = new RegExp(term, "gi");
        let searchTest = regex.test(hotel.name)
          || regex.test(hotel.code)
          || regex.test(hotel.address.city)
          || regex.test(hotel.address.state);
        return searchTest;
      });
    });
  }
}

////////////////
// Interfaces //
////////////////

export interface Hotel {
  name?: string;
  code?: string;
  floorCount?: number;
  suiteCount?: number;
  roomCount?: number;
  checkInTime?: string;
  checkOutTime?: string;
  hoursToCancel?: number;
  address?: Address;
  restaurants?: Restaurants
  lounges?: Lounges;
  images?: Images
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

export interface Images {
  thumbnail?: string;
  large?: string;
}

export type Lounges = Lounge[];

export interface Lounge {
  name: string;
  phoneNumber: string;
}