import { CompanyResolverService } from './companies-routing/company-resolver.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap/modal';
import { SharedModule } from '../../shared/shared.module';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { CompaniesService } from '../../shared/companies.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesRoutingModule } from './companies-routing/companies-routing.module';
import { CompaniesComponent } from './companies/companies.component';
import { CompaniesListComponent } from './companies-list/companies-list.component';

@NgModule({
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    SharedModule,
    ModalModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    CompaniesComponent,
    CompanyEditComponent,
    CompaniesListComponent
  ],
  providers: [
    CompaniesService,
    CompanyResolverService
  ]
})
export class CompaniesModule { }
