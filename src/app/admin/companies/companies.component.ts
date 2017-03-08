import { ToastrService } from 'toastr-ng2/toastr-service';
import { Router } from '@angular/router';
import { CompaniesService } from '../../shared/companies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  constructor(
    private _companies: CompaniesService,
    private _router: Router,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
  }

  addCompany(event: Event) {
    event.preventDefault();
    this._companies.create()
      .subscribe(key => {
        this._toast.success('', 'Company created!');
        this._router.navigateByUrl('/company/edit/' + key);
      });
  }
}
