import { Component, OnInit } from '@angular/core';
import { Event as RouterEvent, NavigationStart, Router } from '@angular/router';
import { BreadcrumbService } from 'app/hotels/breadcrumb.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {
  title: string = 'Hotels';
  subtitle: string = '';

  constructor(
    private _breadSvc: BreadcrumbService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._breadSvc.breadcrumbs$.subscribe(s => this.subtitle = s);
    this._router.events.subscribe(event => this._navigateIntercept(event));
  }

  private _navigateIntercept(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.subtitle = '';
    }
  }

}
