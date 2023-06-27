/* eslint-disable no-plusplus */
import { Component } from '@angular/core';
import { distinctUntilChanged, tap } from 'rxjs';
import { AudioTrack, Playlist } from '../shared/models/models';
import { PlaylistService } from '../shared/services/playlist/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent {
  playlist: Playlist = [];

  currentIndex: number = 0;

  isPlaying: boolean = false;

  constructor(private playlistService: PlaylistService) {
    this.playlistService
      .getIsPlaying$()
      .pipe(
        distinctUntilChanged(),
        tap((value) => (this.isPlaying = value))
      )
      .subscribe();

    this.playlistService
      .getPlaylist$()
      .subscribe((value) => (this.playlist = value));

    this.playlistService
      .getCurrentIndex$()
      .subscribe((value) => (this.currentIndex = value));
  }

  play(index: number, playlist: Playlist) {
    if (this.currentIndex !== index) {
      this.stop();
      this.playlistService.setCurrentIndex(index);
    }
    this.playlistService.setCurrentAudioTrack(index, playlist);
    this.playlistService.setIsPlaying(true);
  }

  stop() {
    this.playlistService.setIsPlaying(false);
  }

  // Télécharger une piste de la playlist
  protected downloadAudioTrack(audioTrack: AudioTrack): void {
    const link = document.createElement('a');
    link.href = audioTrack.url;
    link.download = audioTrack.name;
    link.click();
  }

  // Supprimer une piste de la playlist
  protected deleteAudioTrack(index: number): void {
    this.playlistService.deleteAudioTrack(index);
    this.playlistService.getPlaylist$();
  }

  // Désactivation du bouton play de la piste en lecture
  protected displayButton(index: number): boolean {
    return this.isPlaying === true && this.currentIndex === index;
  }
}
