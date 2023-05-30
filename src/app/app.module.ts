import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddAudioTrackFormComponent } from './add-audio-track-form/add-audio-track-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AddAudioTrackFormComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
