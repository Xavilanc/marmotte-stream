import { FormControl } from "@angular/forms";

export interface AudioTrack {
  title: FormControl<string | null>;
  path: FormControl<string | null>;
}

export interface FormFieldConfig {
  label: string;
  inputType: string;
  inputName: string;
  inputPlaceholder: string;
  formControlName: string;
}
