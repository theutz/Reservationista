import { CompanyEditComponent } from '../company-edit/company-edit.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'app/shared/can-deactivate-guard.service';
import { CompaniesComponent } from '../companies/companies.component';
import { CompanyResolverService } from './company-resolver.service';

const routes: Routes = [
  {
    path: '', component: CompaniesComponent, children: [
      {
        path: 'companies',
        component: CompaniesComponent,
        canDeactivate: [CanDeactivateGuard],
        data: { breadcrumb: 'Companies' }
      },
      {
        path: 'company/edit/:id',
        component: CompanyEditComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          company: CompanyResolverService
        },
        data: { breadcrumb: 'Edit Company' }
      },
      { path: '', redirectTo: '/admin/companies', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class CompaniesRoutingModule { }