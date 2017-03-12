import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CompaniesService, Company } from 'app/shared/companies.service';
import { Resolve } from '@angular/router/src/interfaces';
import { Injectable } from '@angular/core';

@Injectable()
export class CompanyResolverService implements Resolve<Company> {

  constructor(
    private _companies: CompaniesService,
    private _router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Company> {
    let id = route.params['id'];

    return this._companies.get(id)
      .first()
      .toPromise()
      .then(company => {
        if (company) {
          return company;
        } else {
          this._router.navigate(['/companies']);
          return null;
        }
      })
  }
}
