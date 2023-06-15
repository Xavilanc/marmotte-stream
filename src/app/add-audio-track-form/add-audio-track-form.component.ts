import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AudioTrack, FormFieldConfig, Playlist } from '../shared/models/models';
import { AUDIO_TRACK_FORM_CONFIG } from '../form.config';
import { PlaylistService } from '../shared/services/playlist/playlist.service';

@Component({
  selector: 'app-add-audio-track-form',
  templateUrl: './add-audio-track-form.component.html',
  styleUrls: ['./add-audio-track-form.component.css'],
})
export class AddAudioTrackFormComponent {
  selectedOption: string = 'text';

  audioTrack = new FormControl('');

  newAudioTrack!: AudioTrack;

  audioTrackFileUrl: string = '';

  audioTrackName: string = '';

  formFieldConfig: FormFieldConfig[] = AUDIO_TRACK_FORM_CONFIG;

  constructor(private playlistService: PlaylistService) {}

  onSubmit(event: Event): void {
    console.log('Audio Track Form submitted');
    console.log(this.getAudioTrack());
    this.playlistService.addAudioTrack(this.getAudioTrack());
  }

  protected getType() {
    return this.formFieldConfig[0].inputType;
  }

  protected getAudioTrack(): AudioTrack {
    if (this.formFieldConfig[0].inputType === 'file') {
      this.newAudioTrack = {
        url: this.audioTrackFileUrl,
        name: this.audioTrackName,
      };
      return this.newAudioTrack;
    }
    this.newAudioTrack = {
      url: this.audioTrack.value!,
      name: this.getFileNameFromUrl(this.audioTrack.value!),
    };
    return this.newAudioTrack;
  }

  // Creation d'une URL a partir du fichier sélectionné
  protected onFileInputChange(event: Event): void {
    if (this.formFieldConfig[0].inputType === 'file') {
      const fileInput = event.target as HTMLInputElement;
      const file = fileInput.files![0];
      this.audioTrackName = file.name;
      const blobUrl = URL.createObjectURL(file);
      this.audioTrackFileUrl = blobUrl;
    }
  }

  // Changement de type d'input
  protected onSelectChange(event: Event) {
    this.selectedOption = (event.target as HTMLSelectElement).value;
    if (this.selectedOption === 'file') {
      this.updateFormFieldType('file', 'Choisir un fichier');
    } else {
      this.updateFormFieldType('text', 'Entrez une URL');
    }
  }

  // Mise à jour de l'input et du placeholder
  protected updateFormFieldType(inputType: string, inputPlaceholder: string) {
    this.formFieldConfig[0].inputType = inputType;
    this.formFieldConfig[0].inputPlaceholder = inputPlaceholder;
  }

  // Récupération du nom de fichier dans l'URL
  protected getFileNameFromUrl(url: string): string {
    const slashIndex = url.lastIndexOf('/');
    return url.substring(slashIndex + 1);
  }
}
