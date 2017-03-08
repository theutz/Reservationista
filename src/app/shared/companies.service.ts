import { Observable, ReplaySubject } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';
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

  get(key: string) {
    return this._af.object(this._companyNode(key));
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

  private _companyNode(key: string): string {
    return [this._nodeName, key].join('/');
  }

}

export type Companies = Company[];

export interface Company {
  name: string;
}
