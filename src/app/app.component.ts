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

    constructor(
        private _titleService: Title,
        private _brandingService: BrandingService
    ) { }

    ngOnInit() {
        this.setTitle(this.title);
    }

    setTitle(title: string): void {
        this.title = title;
        this._brandingService.setTitle(title);
        this._titleService.setTitle(title);
    }
}
