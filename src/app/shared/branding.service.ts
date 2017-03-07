import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class BrandingService {
  company$: Observable<string>;
  title$: Observable<string>;
  tagline$: Observable<string>;
  copyrightYear$: Observable<string>;

  constructor() {
    this.company$ = Observable.of('Reservationista');
    this.title$ = this.company$;
    this.tagline$ = Observable.of('Five-star service made fast!')
    this.copyrightYear$ = Observable.of('2017');
  }

}
