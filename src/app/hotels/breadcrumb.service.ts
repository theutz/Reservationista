import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class BreadcrumbService {
  private _sub = new ReplaySubject<Breadcrumbs>();

  breadcrumbs$: Observable<Breadcrumbs>;

  constructor() {
    this.breadcrumbs$ = this._sub.asObservable();
    this._sub.next([{ name: 'Home', link: '/home' }])
  }
}

export type Breadcrumbs = Breadcrumb[];

export interface Breadcrumb {
  name: string;
  link?: string;
}