/* eslint-disable no-restricted-globals */
import { AfterViewChecked, Component } from '@angular/core';
import { distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { AudioTrack, Playlist } from '../shared/models/models';
import { PlaylistService } from '../shared/services/playlist/playlist.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css'],
})
export class AudioPlayerComponent {
  playlist: Playlist = [];

  currentTrack: AudioTrack = {
    url: '',
    name: '',
  };

  progressValue: number = 0;

  currentTime: number = 0;

  currentIndex: number = 0;

  duration: number = 0;

  audioElement!: HTMLAudioElement;

  isPlaying!: boolean;

  constructor(private playlistService: PlaylistService) {
    this.playlistService
      .getCurrentAudioTrack$()
      .pipe(
        switchMap((track) => {
          this.currentTrack = track;
          return this.playlistService.getIsPlaying$();
        }),
        distinctUntilChanged(),
        filter(() => this.playlist.length > 0),
        tap((value) => {
          this.isPlaying = value;
          if (value) {
            this.play();
          } else {
            this.stop();
          }
        })
      )
      .subscribe();

    this.playlistService
      .getCurrentIndex$()
      .subscribe((value) => (this.currentIndex = value));

    this.playlistService
      .getPlaylist$()
      .subscribe((value) => (this.playlist = value));
  }

  play(): void {
    const audioElement = document.getElementById(
      'current-track'
    ) as HTMLAudioElement;
    console.log(this.currentTrack);
    console.log(this.currentIndex);
    audioElement.src = this.currentTrack.url;
    audioElement.currentTime = this.currentTime;
    audioElement.play();

    const progressElement = document.querySelector(
      'progress'
    ) as HTMLProgressElement;
    audioElement.addEventListener('timeupdate', () => {
      // Vérifier si la valeur est un nombre valide
      if (
        !isNaN(audioElement.currentTime) &&
        isFinite(audioElement.currentTime) &&
        !isNaN(audioElement.duration) &&
        isFinite(audioElement.duration)
      ) {
        // Assigner la valeur seulement si elle est valide
        this.progressValue =
          (audioElement.currentTime / audioElement.duration) * 100;
      } else {
        // Si la valeur n'est pas valide, assigner une valeur par défaut
        this.progressValue = 0;
      }
      this.currentTime = audioElement.currentTime;
      this.duration = audioElement.duration;
    });
  }

  pause(): void {
    this.playlistService.setIsPlaying(false);
    const audioElement = document.getElementById(
      'current-track'
    ) as HTMLAudioElement;
    audioElement.pause();
  }

  stop(): void {
    this.playlistService.setIsPlaying(false);
    const audioElement = document.getElementById(
      'current-track'
    ) as HTMLAudioElement;
    audioElement.pause();
    audioElement.currentTime = 0;
  }

  convertTime(time: number): string {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    const formattedHours = this.padNumber(hours);
    const formattedMinutes = this.padNumber(minutes);
    const formattedSeconds = this.padNumber(seconds);

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  padNumber(number: number): string {
    return number.toString().padStart(2, '0');
  }

  handleAudioEnded = () => {
    // Supprime l'écouteur d'événement de fin de lecture
    this.playlistService.setIsPlaying(false);
    this.currentTime = 0;
    const audioElement = document.getElementById(
      'current-track'
    ) as HTMLAudioElement;
    audioElement.removeEventListener('ended', this.handleAudioEnded);

    // Vérifie s'il reste d'autres pistes à lire dans la playlist
    if (this.currentIndex < this.playlist.length - 1) {
      // Passe à la piste suivante
      this.currentIndex += 1;
      this.playlistService.setCurrentAudioTrack(
        this.currentIndex,
        this.playlist
      );
      this.play();
      this.playlistService.setIsPlaying(true);
    } else {
      // Fin de la playlist, arrête la lecture et réinitialise l'index
      this.playlistService.setCurrentIndex(0);
      this.playlistService.setIsPlaying(false);
    }
  };
}
