import { BrandingService } from './shared/branding.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title: string = 'Reservationista';
    tagline: string = 'Five-star service made fast';

    constructor(
        private _titleService: Title,
        private _brandingService: BrandingService
    ) { }

    ngOnInit() {
        this._setTitle(this.title);
        this._setTagline(this.tagline);
    }

    private _setTitle(title: string): void {
        this.title = title;
        this._brandingService.setTitle(title);
        this._titleService.setTitle(title);
    }

    private _setTagline(tagline: string) {
        this._brandingService.setTagline(tagline);
    }
}
