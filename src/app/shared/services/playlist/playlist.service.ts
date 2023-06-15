/* eslint-disable no-restricted-syntax */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AudioTrack, Playlist } from '../../models/models';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private playlist$ = new BehaviorSubject<Playlist>([]);

  addAudioTrack(audioTrack: AudioTrack): void {
    this.playlist$.next([...this.playlist$.value, audioTrack]);
  }

  deleteAudioTrack(index: number): void {
    this.playlist$.next(
      this.playlist$.value.filter((_value, i) => i !== index)
    );
  }

  getPlaylist$(): Observable<Playlist> {
    return this.playlist$.asObservable();
  }
}
