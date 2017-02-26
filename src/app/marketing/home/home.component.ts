import { BrandingService } from '../../shared/branding.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title: string = '';
  tagline: string = '';

  constructor(
    private _brandingService: BrandingService
  ) { }

  ngOnInit() {
    this._setBranding();
  }

  private _setBranding() {
    this._brandingService.tagline$.subscribe(tagline => this.tagline = tagline);
    this._brandingService.title$.subscribe(title => this.title = title);
  }

}
