import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class SubtitleService {
  private _subtitleSource = new ReplaySubject<string>();

  subtitle$: Observable<string>;

  constructor() {
    this.subtitle$ = this._subtitleSource.asObservable();
  }

  setSubtitle(subtitle: string) {
    this._subtitleSource.next(subtitle);
  }
}
