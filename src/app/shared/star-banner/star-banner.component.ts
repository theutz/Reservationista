import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-banner',
  templateUrl: './star-banner.component.html',
  styleUrls: ['./star-banner.component.scss']
})
export class StarBannerComponent implements OnInit {
  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}
