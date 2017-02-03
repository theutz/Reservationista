import { BrandingService } from '../../shared/branding.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tagline: string = '';

  constructor(
    private _brandingService: BrandingService
  ) { }

  ngOnInit() {
    this._setTagline();
  }

  private _setTagline() {
    this._brandingService.tagline$.subscribe(tagline => this.tagline = tagline);
  }

}
