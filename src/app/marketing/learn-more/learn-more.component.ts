import { BrandingService } from '../../shared/branding.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learn-more',
  templateUrl: './learn-more.component.html',
  styleUrls: ['./learn-more.component.scss']
})
export class LearnMoreComponent implements OnInit {
  title: string = '';
  tagline: string = '';

  constructor(
    private _bs: BrandingService
  ) { }

  ngOnInit() {
    this._setBranding();
  }

  private _setBranding() {
    this._bs.title$.subscribe(x => this.title = x);
    this._bs.tagline$.subscribe(x => this.tagline = x);
  }

}
