import { ModalDirective } from 'ng2-bootstrap/modal';
import { ToastrService } from 'toastr-ng2/toastr-service';
import { Router } from '@angular/router';
import { Companies, CompaniesService, Company } from 'app/shared/companies.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {

  }
}
