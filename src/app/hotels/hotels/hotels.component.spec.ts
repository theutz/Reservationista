import { ReplaySubject } from 'rxjs/Rx';
import { SubtitleService } from '../subtitle.service';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '../search/search.component';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HotelsComponent } from './hotels.component';

class SubtitleServiceSpy {
  subtitle$ = jasmine.createSpyObj('subtitle$', ['subscribe'])
}

describe('HotelsComponent', () => {
  let component: HotelsComponent;
  let fixture: ComponentFixture<HotelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HotelsComponent, SearchComponent],
      providers: [
        { provide: SubtitleService, useClass: SubtitleServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
