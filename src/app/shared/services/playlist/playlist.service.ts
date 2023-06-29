/* eslint-disable no-restricted-syntax */
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  filter,
  map,
  switchMap,
  take,
} from 'rxjs';
import { AudioStatus, AudioTrack, Playlist } from '../../models/models';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private readonly playlist = new BehaviorSubject<Playlist>([]);
  readonly playlist$ = this.playlist.asObservable();

  private readonly currentIndex = new BehaviorSubject<number>(0);
  readonly currentIndex$ = this.currentIndex.asObservable();

  private readonly currentAudioTrack = new BehaviorSubject<AudioTrack>({
    url: '',
    name: '',
  });
  readonly currentAudioTrack$ = this.currentAudioTrack.asObservable();

  // private readonly isPlaying = new BehaviorSubject<boolean>(false);
  // readonly isPlaying$ = this.isPlaying.asObservable();

  private readonly audioStatus = new BehaviorSubject<AudioStatus>('stopped');
  readonly audioStatus$ = this.audioStatus.asObservable();

  addAudioTrack(audioTrack: AudioTrack): void {
    this.playlist.next([...this.playlist.value, audioTrack]);
  }

  deleteAudioTrack(index: number): void {
    this.playlist.next(this.playlist.value.filter((_value, i) => i !== index));
  }

  getAudioTrackByIndex$(index: number): Observable<AudioTrack | undefined> {
    return this.playlist$.pipe(
      map((playlist: Playlist) =>
        index && index < playlist.length ? playlist[index] : undefined
      )
    );
  }

  // setIsPlaying(isPlaying: boolean): void {
  //   this.isPlaying.next(isPlaying);
  // }

  setCurrentAudioTrack(index: number, playlist: Playlist): void {
    this.currentAudioTrack.next(playlist[index]);
  }

  getPlaylistLength(): number {
    return this.playlist.value.length;
  }

  setCurrentIndex(index: number): void {
    this.currentIndex.next(index);
  }

  setAudioStatus(newAudioStatus: AudioStatus): void {
    this.audioStatus.next(newAudioStatus);
  }
}
