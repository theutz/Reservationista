import { BrandingService } from '../branding.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title: string = '';

  constructor(
    private _brandingService: BrandingService
  ) { }

  ngOnInit() {
    this._setTitle();
  }

  private _setTitle(): void {
    this._brandingService.title$.subscribe(title => this.title = title);
  }


}
