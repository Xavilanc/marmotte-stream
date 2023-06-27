/* eslint-disable no-plusplus */
import { Component, OnInit } from '@angular/core';
import { AudioTrack, Playlist } from '../shared/models/models';
import { PlaylistService } from '../shared/services/playlist/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit {
  playlist: Playlist = [];

  audioStatus!: string;

  currentIndex: number = 0;

  isPlaying: boolean = false;

  constructor(private playlistService: PlaylistService) {
    this.playlistService
      .getIsPlaying$()
      .subscribe((value) => (this.isPlaying = value));

    this.playlistService
      .getPlaylist$()
      .subscribe((value) => (this.playlist = value));

    this.playlistService
      .getCurrentIndex$()
      .subscribe((value) => (this.currentIndex = value));
  }

  ngOnInit(): void {
    this.playlistService.getAudioStatus$().subscribe((status) => {
      this.audioStatus = status;
    });
  }

  play(index: number) {
    if (this.currentIndex !== index) {
      this.stop();
      this.currentIndex = index;
    }

    this.playlistService.setIsPlaying(true);
    this.playlistService.play();
  }

  stop() {
    this.playlistService.setIsPlaying(false);
    this.playlistService.stop();
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
