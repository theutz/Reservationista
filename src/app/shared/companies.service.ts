import { Observable, ReplaySubject } from 'rxjs/Rx';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CompaniesService {
  private _nodeName: string;
  private _listName: string;

  constructor(
    private _af: AngularFireDatabase
  ) {
    this._listName = 'companies';
    this._nodeName = '/' + this._listName;
  }

  getAll(): FirebaseListObservable<Companies> {
    return this._af.list(this._listName);
  }

  get(key: string) {
    return this._af.object(this._companyNode(key));
  }

  update(key: string, company: Company): Observable<void> {
    let sub: ReplaySubject<void> = new ReplaySubject<void>(1);
    this._af.object(this._companyNode(key))
      .update(company)
      .then(() => {
        sub.next(null);
        sub.complete();
      });
    return sub.asObservable();
  }

  create(): Observable<string> {
    let blankCompany: Company = { name: '' };
    let sub: ReplaySubject<string> = new ReplaySubject<string>(1);

    this._af.list(this._listName)
      .push(blankCompany)
      .then(company => {
        sub.next(company.key);
        sub.complete();
      });

    return sub.asObservable();
  }

  remove(key: string): Observable<void> {
    let sub: ReplaySubject<void> = new ReplaySubject<void>(1);
    if (!!key) {
      this._af.object(this._companyNode(key))
        .remove()
        .then(() => {
          sub.next(null);
        })
    } else {
      sub.error(new Error(`Key is undefined.`));
    }
    return sub.asObservable();
  }

  private _companyNode(key: string): string {
    return [this._nodeName, key].join('/');
  }

}

export type Companies = Company[];

export interface Company {
  name: string;
}
