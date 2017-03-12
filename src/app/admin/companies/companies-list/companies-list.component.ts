import { ToastrService } from 'toastr-ng2/toastr-service';
import { Router } from '@angular/router';
import { Companies, CompaniesService } from '../../../shared/companies.service';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss']
})
export class CompaniesListComponent implements OnInit {
  @ViewChild('childModal') childModal: ModalDirective;

  loading: boolean = true;
  companies: Companies = [];
  companyToRemove: any;

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
        this._router.navigateByUrl('/admin/companies/edit/' + key);
      });
  }

  editCompany(company: any): void {
    this._router.navigateByUrl('/admin/companies/edit/' + company.$key);
  }

  showRemoveModal(company: any): void {
    this.companyToRemove = company;
    this.childModal.show();
  }

  hideRemoveModal(): void {
    this.childModal.hide();
  }

  removeCompany() {
    this._companiesService.remove(this.companyToRemove.$key)
      .catch((err, caught) => {
        throw new Error(err);
      })
      .subscribe(() => {
        this._toast.success(`Deleted ${this.companyToRemove.name}`, 'Company removed!')
        this.childModal.hide();
      });
  }

  private _loadCompanies() {
    this._companiesService.getAll()
      .subscribe(companies => {
        this.loading = false;
        this.companies = companies;
      });
  }
}
