import { ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET, Router, UrlSegment } from '@angular/router';
import { Component, OnInit } from '@angular/core';

interface IBreadcrumb {
  label: string;
  params: Params;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: IBreadcrumb[];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.breadcrumbs = [];
  }

  ngOnInit() {
    const ROUTE_DATA_BREADCRUMB: string = 'breadcrumb';

    this._router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(event => {
        let root: ActivatedRoute = this._activatedRoute.root;
        this.breadcrumbs = this._getBreadcrumbs(root);
      })
  }

  private _getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []) {
    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

    // get child routes
    let children: ActivatedRoute[] = route.children;

    // return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    // iterate over each children
    for (let child of children) {
      // verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      // verify the custom data property is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this._getBreadcrumbs(child, url, breadcrumbs);
      }

      // get the route's URL segment
      let routeUrl: string = child.snapshot.url
        .map(segment => segment.path)
        .join("/");

      // append route to url
      url += `/${routeUrl}`;

      // add breadcrumb
      let breadcrumb: IBreadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url: url
      };

      // Avoid repeating parent elements
      if (!breadcrumbs.some(crumb => crumb.label == breadcrumb.label)) {
        breadcrumbs.push(breadcrumb);
      }

      // recursive
      return this._getBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

}
