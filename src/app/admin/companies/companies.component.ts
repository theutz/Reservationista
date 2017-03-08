import { ToastrService } from 'toastr-ng2/toastr-service';
import { Router } from '@angular/router';
import { Companies, CompaniesService, Company } from '../../shared/companies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  loading: boolean = true;
  companies: Companies = [];

  constructor(
    private _companiesService: CompaniesService,
    private _router: Router,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this._loadCompanies();
  }

  addCompany(event: Event) {
    event.preventDefault();
    this._companiesService.create()
      .subscribe(key => {
        this._toast.success('', 'Company created!');
        this._router.navigateByUrl('/company/edit/' + key);
      });
  }

  editCompany(company: any) {
    this._router.navigateByUrl('/company/edit/' + company.$key);
  }

  private _loadCompanies() {
    this._companiesService.getAll()
      .subscribe(companies => {
        this.loading = false;
        this.companies = companies;
      });
  }
}
