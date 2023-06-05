import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AudioTrack, InputType } from '../models/models';

@Component({
  selector: 'app-add-audio-track-form',
  templateUrl: './add-audio-track-form.component.html',
  styleUrls: ['./add-audio-track-form.component.css'],
})
export class AddAudioTrackFormComponent {

  inputType: InputType = 'text';

  selectedOption: InputType = '';

  audioTrackPath: string = '';

  selectedFile!: File;

  addAudioTrackForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.addAudioTrackForm = this.formBuilder.group<AudioTrack>({
      title: '',
      genre: '',
      path: ''
    });
  }

  updateInputType(): void {
    this.inputType = this.selectedOption;
  }

  showPreview(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      const file = target.files![0];

      this.selectedFile = file;
      this.audioTrackPath = URL.createObjectURL(file);
    }
  }

  onSubmit(): void {
    console.log('Audio Track Form submitted');
    console.log(this.addAudioTrackForm.value);
  }
}
