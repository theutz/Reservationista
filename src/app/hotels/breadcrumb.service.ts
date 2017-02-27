import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class BreadcrumbService {
  private _subtitleSource = new ReplaySubject<string>();

  subtitle$: Observable<string>;

  constructor() {
    this.subtitle$ = this._subtitleSource.asObservable();
  }

  setSubtitle(subtitle: string) {
    this._subtitleSource.next(subtitle);
  }
}
