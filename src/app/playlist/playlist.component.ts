/* eslint-disable no-plusplus */
import { Component, OnInit } from '@angular/core';
import { AudioTrack, Playlist } from '../shared/models/models';
import { PlaylistService } from '../shared/services/playlist/playlist.service';
import { AudioService } from '../shared/services/audio/audio.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit {
  playlist: Playlist = [];

  audioStatus!: string;

  currentIndex: number = 0;

  constructor(
    private playlistService: PlaylistService,
    private audioService: AudioService
  ) {}

  ngOnInit(): void {
    this.playlistService
      .getPlaylist$()
      .subscribe((value) => (this.playlist = value));

    this.playlistService
      .getCurrentIndex$()
      .subscribe((value) => (this.currentIndex = value));

    this.audioService.getAudioStatus$().subscribe((status) => {
      this.audioStatus = status;
    });
  }

  play(index: number) {
    if (this.currentIndex !== index) {
      // Arrête la lecture du fichier en cours
      this.stopCurrentTrack();
    }

    this.audioService.play();
    const audioElement = document.getElementById(
      'audio-track'
    ) as HTMLAudioElement;
    audioElement.play();

    // Mise à jour de l'index en cours de lecture
    this.currentIndex = index;
    this.playlistService.setCurrentIndex(index);

    // On écoute l'évenement de fin de lecture
    audioElement.addEventListener('ended', this.handleAudioEnded);
  }

  stop() {
    this.stopCurrentTrack();
  }

  // Réinitialisation en fin de playlist
  handleAudioEnded = () => {
    const audioElement = document.getElementById(
      'audio-track'
    ) as HTMLAudioElement;

    // Supprime l'écouteur d'événement de fin de lecture
    audioElement.removeEventListener('ended', this.handleAudioEnded);

    // Vérifie s'il reste d'autres pistes à lire dans la playlist
    if (this.currentIndex < this.playlist.length - 1) {
      // Passe à la piste suivante
      this.currentIndex++;
      this.playCurrentTrack();
    } else {
      // Fin de la playlist, arrête la lecture et réinitialise l'index
      this.audioService.stop();
      this.currentIndex = 0;
    }
  };

  // Lecture de la piste en cours de la playlist
  playCurrentTrack() {
    const currentTrack = this.playlist[this.currentIndex];
    const audioElement = document.getElementById(
      'audio-track'
    ) as HTMLAudioElement;
    audioElement.src = currentTrack.url;
    audioElement.load();
    this.play(this.currentIndex);
  }

  // Arrêt de la lecture en cours
  stopCurrentTrack() {
    const audioElement = document.getElementById(
      'audio-track'
    ) as HTMLAudioElement;
    audioElement.pause();
    audioElement.currentTime = 0; // Remet la position de lecture au début
    this.audioService.stop();
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
    return this.audioStatus !== 'stopped' && this.currentIndex === index;
  }
}
