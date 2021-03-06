import { Component, OnInit } from '@angular/core';
import { Event as RouterEvent, NavigationStart, Params, Router } from '@angular/router';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {
  title: string = 'Hotels';
  subtitle: string = '';

  constructor(
    private _router: Router,
  ) { }

  ngOnInit() {
    this._router.events.subscribe(event => this._navigateIntercept(event));
  }

  private _navigateIntercept(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.subtitle = '';
    }
  }

}
