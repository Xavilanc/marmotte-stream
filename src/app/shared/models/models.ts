export interface FormFieldConfig {
  label: string;
  inputType: string;
  inputName: string;
  inputPlaceholder: string;
  formControlName: string;
}

export interface AudioTrack {
  url: string;
  name: string;
}

export type Playlist = AudioTrack[];

export type AudioStatus = 'stopped' | 'playing' | 'paused' | 'ended';
