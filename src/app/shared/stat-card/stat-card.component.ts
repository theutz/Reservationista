import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss']
})
export class StatCardComponent implements OnInit {
  @Input() value: string;
  @Input() label: string;

  constructor() { }

  ngOnInit() {
  }

}
