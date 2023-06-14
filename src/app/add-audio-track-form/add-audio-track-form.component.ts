import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormFieldConfig, Playlist } from '../shared/models/models';
import { AUDIO_TRACK_FORM_CONFIG } from '../form.config';
import { PlaylistService } from '../shared/services/playlist.service';

@Component({
  selector: 'app-add-audio-track-form',
  templateUrl: './add-audio-track-form.component.html',
  styleUrls: ['./add-audio-track-form.component.css'],
})
export class AddAudioTrackFormComponent {
  selectedOption: string = 'text';

  audioTrack = new FormControl('');

  audioTrackFileUrl: string = '';

  formFieldConfig: FormFieldConfig[] = AUDIO_TRACK_FORM_CONFIG;

  constructor(private playlistService: PlaylistService) {}

  // Getter for the input type
  getType() {
    return this.formFieldConfig[0].inputType;
  }

  // Get audio track URL
  getAudioTrack(): string {
    if (this.formFieldConfig[0].inputType === 'file') {
      return this.audioTrackFileUrl;
    }
    return this.audioTrack.value!;
  }

  // Create an URL from the selected file
  onFileInputChange(event: Event): void {
    if (this.formFieldConfig[0].inputType === 'file') {
      const fileInput = event.target as HTMLInputElement;
      const file = fileInput.files![0];
      const blobUrl = URL.createObjectURL(file);
      this.audioTrackFileUrl = blobUrl.replace(/^blob:/, '');
    }
  }

  onSubmit(event: Event): void {
    console.log('Audio Track Form submitted');
    console.log(this.getAudioTrack());
    this.playlistService.addAudioTrack(this.getAudioTrack());
  }

  // Change input type
  onSelectChange(event: Event) {
    this.selectedOption = (event.target as HTMLSelectElement).value;
    if (this.selectedOption === 'file') {
      this.updateFormFieldType('file', 'Choisir un fichier');
    } else {
      this.updateFormFieldType('text', 'Entrez une URL');
    }
  }

  // Update input type and placeholder
  updateFormFieldType(inputType: string, inputPlaceholder: string) {
    this.formFieldConfig[0].inputType = inputType;
    this.formFieldConfig[0].inputPlaceholder = inputPlaceholder;
  }
}
