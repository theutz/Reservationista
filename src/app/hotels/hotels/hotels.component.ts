import { HotelDetailComponent } from '../hotel-detail/hotel-detail.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private _subtitleService: SubtitleService
  ) { }

  ngOnInit() {
    this._subtitleService.subtitle$.subscribe(s => this.subtitle = s);
  }

}
