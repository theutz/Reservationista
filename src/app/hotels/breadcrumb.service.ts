import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class BreadcrumbService {
  private _sub = new ReplaySubject<string>();

  breadcrumbs$: Observable<string>;

  constructor() {
    this.breadcrumbs$ = this._sub.asObservable();
  }

  setBreadcrumbs(subtitle: string) {
    this._sub.next(subtitle);
  }
}
