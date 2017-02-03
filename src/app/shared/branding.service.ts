import { ReplaySubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class BrandingService {
  private _titleSource = new ReplaySubject<string>();
  private _taglineSource = new ReplaySubject<string>();

  title$ = this._titleSource.asObservable();
  tagline$ = this._taglineSource.asObservable();

  constructor() { }

  setTitle(title: string) {
    this._titleSource.next(title);
  }

  setTagline(tagline: string) {
    this._taglineSource.next(tagline);
  }

}
