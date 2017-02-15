import { FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-control-image-upload',
  templateUrl: './form-control-image-upload.component.html',
  styleUrls: ['./form-control-image-upload.component.scss']
})
export class FormControlImageUploadComponent implements OnInit {
  @Input() imageUrl: string = '';
  @Input() label: string = '';
  @Output() onUpload: EventEmitter<Event> = new EventEmitter<Event>();
  @Input('group') myForm: FormGroup;
  @Input('name') controlName: string;

  constructor() { }

  ngOnInit() {
  }

  imageUploaded(event: Event) {
    event.preventDefault();
    this.onUpload.next(event);
  }

  imageRemoved(event: Event) {

  }

}
