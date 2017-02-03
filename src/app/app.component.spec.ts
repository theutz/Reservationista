import { BrandingService } from './shared/branding.service';
/* tslint:disable:no-unused-variable */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";

class BrandingServiceSpy {
    setTitle = jasmine.createSpy('setTitle');
}

describe('AppComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            providers: [{ provide: BrandingService, useClass: BrandingServiceSpy }],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
    });

    it('should create the app', async(() => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

});
