import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Playlist } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private playlist: Playlist = [];

  private playlist$ = new Subject<Playlist>();

  getPlaylist(): Playlist {
    return this.playlist;
  }

  addAudioTrack(audioTrack: string) {
    this.playlist.push(audioTrack);
    this.playlist$.next(this.playlist);
  }

  getPlaylist$(): Subject<Playlist> {
    return this.playlist$;
  }
}
