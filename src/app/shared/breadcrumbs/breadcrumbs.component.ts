import { Breadcrumbs, BreadcrumbService } from '../../hotels/breadcrumb.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: Breadcrumbs = [];

  constructor(
    private _crumb: BreadcrumbService
  ) { }

  ngOnInit() {
    this.setBreadcrumbs();
  }

  setBreadcrumbs() {
    this._crumb.breadcrumbs$.subscribe(crumbs => {
      this.breadcrumbs = crumbs;
    })
  }

}
