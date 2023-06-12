import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AudioTrack, FormFieldConfig } from '../models/models';
import { AUDIO_TRACK_FORM_CONFIG } from '../form.config';

@Component({
  selector: 'app-add-audio-track-form',
  templateUrl: './add-audio-track-form.component.html',
  styleUrls: ['./add-audio-track-form.component.css'],
})
export class AddAudioTrackFormComponent {
  selectedOption: string = 'text';

  audioTrackPath: string = '';

  private selectedFile!: File;

  addAudioTrackForm: FormGroup;

  formFieldConfig: FormFieldConfig[] = AUDIO_TRACK_FORM_CONFIG;

  constructor(private formBuilder: FormBuilder) {
    this.addAudioTrackForm = this.formBuilder.group<AudioTrack>({
      title: '',
      path: '',
    });
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

  onSelectChange(event: Event) {
    this.selectedOption = (event.target as HTMLSelectElement).value;
    if (this.selectedOption === 'file') {
      this.updateFormFieldType('file', 'Choisir un fichier');
    } else {
      this.updateFormFieldType('text', 'Entrez une URL');
    }
  }

  onFieldValueChanged(value: string, formControlName: string) {
    const control = this.addAudioTrackForm.get(formControlName);
    if (control) {
      control.patchValue(value);
    }
  }

  updateFormFieldType(inputType: string, inputPlaceholder: string) {
    this.formFieldConfig[1].inputType = inputType;
    this.formFieldConfig[1].inputPlaceholder = inputPlaceholder;
  }
}
