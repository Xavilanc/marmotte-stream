import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioTrackFormFieldComponent } from './audio-track-form-field.component';

describe('AudioTrackFormFieldComponent', () => {
  let component: AudioTrackFormFieldComponent;
  let fixture: ComponentFixture<AudioTrackFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioTrackFormFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioTrackFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
