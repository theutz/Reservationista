import { BrandingService } from '../branding.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  companyName: string;
  tagline: string;
  copyrightYear: string;

  constructor(
    private _brand: BrandingService
  ) { }

  ngOnInit() {
    this._brand.company$.subscribe(x => this.companyName = x);
    this._brand.tagline$.subscribe(x => this.tagline = x);
    this._brand.copyrightYear$.subscribe(x => this.copyrightYear = x);
  }

}
