import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class BreadcrumbService {
  private _breadcrumbSource = new ReplaySubject<string>();

  breadcrumbs$: Observable<string>;

  constructor() {
    this.breadcrumbs$ = this._breadcrumbSource.asObservable();
  }

  setBreadcrumbs(subtitle: string) {
    this._breadcrumbSource.next(subtitle);
  }
}
