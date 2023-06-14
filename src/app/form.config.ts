import { FormFieldConfig } from './shared/models/models';

export const AUDIO_TRACK_FORM_CONFIG: FormFieldConfig[] = [
  {
    label: 'path',
    inputType: 'text',
    inputName: 'Path',
    inputPlaceholder: 'URL',
    formControlName: 'path',
  },
];
