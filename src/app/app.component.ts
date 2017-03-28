import { BrandingService } from './shared/branding.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title: string;
    tagline: string;

    constructor(
        private _titleService: Title,
        private _brandingService: BrandingService
    ) { }

    ngOnInit() {
        this._setTitle();
    }

    private _setTitle(): void {
        this._brandingService.title$
            .subscribe(title => this._titleService.setTitle(title))
    }
}
