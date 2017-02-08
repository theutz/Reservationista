import { SubtitleService } from '../subtitle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.scss']
})
export class HotelEditComponent implements OnInit {

  constructor(
    private _subtitleService: SubtitleService
  ) { }

  ngOnInit() {
    this._subtitleService.setSubtitle('Edit');
  }

}
