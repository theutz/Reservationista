import { ReplaySubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class BrandingService {
  private _titleSource = new ReplaySubject<string>();

  title$ = this._titleSource.asObservable();

  constructor() { }

  setTitle(title: string) {
    this._titleSource.next(title);
  }

}
