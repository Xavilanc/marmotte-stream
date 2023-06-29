/* eslint-disable no-plusplus */
import { Component, OnInit, inject } from '@angular/core';
import { AudioStatus, AudioTrack, Playlist } from '../shared/models/models';
import { PlaylistService } from '../shared/services/playlist/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit {
  playlist: Playlist = [];

  currentIndex: number = 0;

  isPlaying: boolean = false;

  audioStatus: AudioStatus = 'stopped';

  protected playlistService = inject(PlaylistService);
  readonly playlist$ = this.playlistService.playlist$;
  readonly currentIndex$ = this.playlistService.currentIndex$;
  readonly audioStatus$ = this.playlistService.audioStatus$;

  ngOnInit(): void {
    this.currentIndex$.subscribe((value) => (this.currentIndex = value));
    this.playlist$.subscribe((value) => (this.playlist = value));
    this.audioStatus$.subscribe((value) => (this.audioStatus = value));
  }

  play(index: number, playlist: Playlist) {
    this.playlistService.setAudioStatus('playing');
    this.playlistService.setCurrentIndex(index);
    this.playlistService.setCurrentAudioTrack(index, playlist);
  }

  stop() {
    this.playlistService.setAudioStatus('stopped');
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
    this.playlistService.setAudioStatus('stopped');
    this.playlistService.deleteAudioTrack(index);
  }

  // Désactivation du bouton play de la piste en lecture
  protected displayButton(index: number): boolean {
    return this.audioStatus === 'playing' && this.currentIndex === index;
  }
}
