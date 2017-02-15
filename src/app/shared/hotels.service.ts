import { Observable } from 'rxjs';
import { FirebaseApp } from 'angularfire2/tokens';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Inject, Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';

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

  getImageUrl(hotelId: string, fileName: string): firebase.Promise<any> {
    return this._storageRef
      .child(this._hotelsNode)
      .child(hotelId)
      .child(fileName)
      .getDownloadURL();
  }

  uploadImage(hotelId: string, imageType: string, file: File): firebase.Promise<any> {
    let uuid = UUID.UUID();
    let ref = this._storageRef.child(this._hotelsNode).child(hotelId);
    let storageName = imageType + '_' + uuid;

    return ref.child(storageName).put(file)
      .then(result => {
        let imgNames: Images = {};
        imgNames[imageType] = storageName;

        // Update thumbnail
        this._af.object(this._hotelsNode + '/' + hotelId + '/images')
          .update(imgNames);
      });
  }

  removeImage(hotelId: string, imageType: string, fileName: string) {
    return this._storageRef
      .child(this._hotelsNode)
      .child(hotelId)
      .child(fileName)
      .delete().then(() => {
        let hotel: Hotel = { images: {} };
        hotel.images[imageType] = null;
        return this.update(hotelId, hotel);
      })
  }

}

export interface Hotel {
  name?: string;
  code?: string;
  address?: Address;
  restaurants?: Restaurants
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