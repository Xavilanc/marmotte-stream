import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { PlaylistService } from '../playlist/playlist.service';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audioStatus$ = new BehaviorSubject<string>('stopped');

  play(): void {
    this.audioStatus$.next('playing');
  }

  pause(): void {
    this.audioStatus$.next('paused');
  }

  stop(): void {
    this.audioStatus$.next('stopped');
  }

  getAudioStatus$(): Observable<string> {
    return this.audioStatus$.asObservable();
  }
}