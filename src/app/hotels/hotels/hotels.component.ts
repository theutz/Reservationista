import { HotelDetailComponent } from '../hotel-detail/hotel-detail.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event as RouterEvent, NavigationStart, Router } from '@angular/router';
import { SubtitleService } from 'app/hotels/subtitle.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {
  title: string = 'Hotels';
  subtitle: string = '';

  constructor(
    private _subtitleService: SubtitleService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._subtitleService.subtitle$.subscribe(s => this.subtitle = s);
    this._router.events.subscribe(event => this._navigateIntercept(event));
  }

  private _navigateIntercept(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.subtitle = '';
    }
  }

}
