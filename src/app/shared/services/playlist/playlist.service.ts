/* eslint-disable no-restricted-syntax */
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, filter, map, switchMap, take } from 'rxjs';
import { AudioTrack, Playlist } from '../../models/models';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private playlist$ = new BehaviorSubject<Playlist>([]);

  private currentIndex$ = new BehaviorSubject<number>(0);

  private currentAudioTrack$ = new BehaviorSubject<AudioTrack>({
    url: '',
    name: '',
  });

  private isPlaying$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.playlist$.subscribe((playlist) => {
      if (playlist) {
        const defaultTrack = playlist[0];
        this.currentAudioTrack$.next(defaultTrack);
      }
    });
  }

  addAudioTrack(audioTrack: AudioTrack): void {
    this.playlist$.next([...this.playlist$.value, audioTrack]);
  }

  deleteAudioTrack(index: number): void {
    this.playlist$.next(
      this.playlist$.value.filter((_value, i) => i !== index)
    );
  }

  getAudioTrackByIndex$(index: number): Observable<AudioTrack | undefined> {
    return this.getPlaylist$().pipe(
      map((playlist: Playlist) =>
        index && index < playlist.length ? playlist[index] : undefined
      )
    );
  }

  getIsPlaying$(): Observable<boolean> {
    return this.isPlaying$.asObservable();
  }

  setIsPlaying(isPlaying: boolean): void {
    this.isPlaying$.next(isPlaying);
  }

  getCurrentAudioTrack$(): Observable<AudioTrack> {
    return this.currentAudioTrack$.asObservable();
  }

  setCurrentAudioTrack(index: number, playlist: Playlist): void {
    this.currentAudioTrack$.next(playlist[index]);
  }

  getPlaylist$(): Observable<Playlist> {
    return this.playlist$.asObservable();
  }

  getCurrentIndex$(): Observable<number> {
    return this.currentIndex$.asObservable();
  }

  setCurrentIndex(index: number): void {
    this.currentIndex$.next(index);
  }
}
