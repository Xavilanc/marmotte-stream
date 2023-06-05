import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAudioTrackFormComponent } from './add-audio-track-form.component';

describe('AddAudioTrackFormComponent', () => {
  let component: AddAudioTrackFormComponent;
  let fixture: ComponentFixture<AddAudioTrackFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAudioTrackFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddAudioTrackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
