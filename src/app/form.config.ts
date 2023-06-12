import { FormFieldConfig } from './models/models';

export const AUDIO_TRACK_FORM_CONFIG: FormFieldConfig[] = [
  {
    label: 'Titre',
    inputType: 'text',
    inputName: 'title',
    inputPlaceholder: 'Titre',
    formControlName: 'title',
  },
  {
    label: 'path',
    inputType: 'text',
    inputName: 'path',
    inputPlaceholder: 'URL',
    formControlName: 'path',
  },
];
