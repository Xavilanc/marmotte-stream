import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AudioStatus } from '../../models/models';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private readonly audioStatus$ = new BehaviorSubject<AudioStatus>('stopped');

  play(): void {
    this.audioStatus$.next('playing');
  }

  pause(): void {
    this.audioStatus$.next('paused');
  }

  stop(): void {
    this.audioStatus$.next('stopped');
  }

  getAudioStatus$(): Observable<AudioStatus> {
    return this.audioStatus$.asObservable();
  }
}
