import { Component, Input } from '@angular/core';
import { FormFieldConfig } from '../models/models';

@Component({
  selector: 'app-audio-track-form-field',
  templateUrl: './audio-track-form-field.component.html',
  styleUrls: ['./audio-track-form-field.component.css']
})
export class AudioTrackFormFieldComponent {
  @Input() formFieldConfig: FormFieldConfig = {
    label: '',
    inputType: '',
    inputName: '',
    inputPlaceholder: '',
    formControlName: ''
  };

}
