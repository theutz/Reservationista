import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-restaurants-edit',
  templateUrl: './restaurants-edit.component.html',
  styleUrls: ['./restaurants-edit.component.scss']
})
export class RestaurantsEditComponent implements OnInit {
  @Input('group')
  public restaurantForm: FormGroup

  constructor() { }

  ngOnInit() {
  }

}
