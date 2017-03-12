import { Location } from '@angular/common';
import { ToastrService } from 'toastr-ng2/toastr-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CompaniesService, Company } from 'app/shared/companies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {
  private _key: string;

  myForm: FormGroup;
  company: Company;
  loading: boolean = true;

  constructor(
    private _companiesService: CompaniesService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _toast: ToastrService,
    private _location: Location
  ) { }

  ngOnInit() {
    this._loadCompany();
  }

  save(model: Company, isValid: boolean): void {
    if (isValid) {
      this._companiesService.update(this._key, model)
        .subscribe(() => {
          this._toast.success(`Saved ${model.name}`, `Success!`);
          this._location.back();
        });
    }
  }

  goBack(event: Event) {
    event.preventDefault();
    this._location.back();
  }

  private _loadCompany(): void {
    this._route.data.subscribe((data: { company: any }) => {
      this._key = data.company.$key;
      this._companiesService.get(this._key)
        .subscribe((company: Company) => {
          this.company = company;
          this.loading = false;
          this._initForms();
        })
    })
  }

  private _initForms(): void {
    this.myForm = this._fb.group({
      name: [this.company.name, [Validators.required]]
    })
  }
}
