/* eslint-disable no-restricted-globals */
import { Component, OnInit, inject } from '@angular/core';
import { AudioStatus, AudioTrack, Playlist } from '../shared/models/models';
import { PlaylistService } from '../shared/services/playlist/playlist.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css'],
})
export class AudioPlayerComponent implements OnInit {
  playlist: Playlist = [];

  currentTrack: AudioTrack = {
    url: '',
    name: '',
  };

  progressValue: number = 0;

  currentTime: number = 0;

  currentIndex: number = 0;

  duration: number = 0;

  audioStatus: AudioStatus = 'stopped';

  audioElement!: HTMLAudioElement;

  protected playlistService = inject(PlaylistService);
  readonly playlist$ = this.playlistService.playlist$;
  readonly currentIndex$ = this.playlistService.currentIndex$;
  readonly currentAudioTrack$ = this.playlistService.currentAudioTrack$;
  readonly audioStatus$ = this.playlistService.audioStatus$;

  protected isPlaying!: boolean;

  ngOnInit(): void {
    this.playlist$.subscribe((value) => (this.playlist = value));
    this.currentAudioTrack$.subscribe((value) => {
      this.currentTrack = value;
      this.audioElement.load();
      this.handleAudioStatus();
    });
    this.currentIndex$.subscribe((value) => (this.currentIndex = value));
    this.audioStatus$.subscribe((value) => {
      this.audioStatus = value;
      this.handleAudioStatus();
    });
  }

  handleAudioStatus(): void {
    if (this.audioStatus === 'playing') {
      this.play();
    } else if (this.audioStatus === 'paused') {
      this.pause();
    } else {
      this.stop();
    }
  }

  play(): void {
    this.playlistService.setAudioStatus('playing');
    this.audioElement = document.getElementById(
      'current-track'
    ) as HTMLAudioElement;
    this.audioElement.currentTime = this.currentTime;
    this.audioElement.play();
    this.audioElement.addEventListener('ended', this.handlePlaylist);

    const progressElement = document.querySelector(
      'progress'
    ) as HTMLProgressElement;
    this.audioElement.addEventListener('timeupdate', () => {
      // Vérifier si la valeur est un nombre valide
      if (
        !isNaN(this.audioElement.currentTime) &&
        isFinite(this.audioElement.currentTime) &&
        !isNaN(this.audioElement.duration) &&
        isFinite(this.audioElement.duration)
      ) {
        // Assigner la valeur seulement si elle est valide
        this.progressValue =
          (this.audioElement.currentTime / this.audioElement.duration) * 100;
      } else {
        // Si la valeur n'est pas valide, assigner une valeur par défaut
        this.progressValue = 0;
      }
      this.currentTime = this.audioElement.currentTime;
      this.duration = this.audioElement.duration;
    });
  }

  handlePlaylist = () => {
    this.playlistService.setAudioStatus('stopped');
    this.audioElement = document.getElementById(
      'current-track'
    ) as HTMLAudioElement;
    this.audioElement.removeEventListener('ended', this.handlePlaylist);
    this.currentTime = 0;
    if (this.currentIndex < this.playlistService.getPlaylistLength() - 1) {
      this.playlistService.setCurrentAudioTrack(
        this.currentIndex,
        this.playlist
      );
      this.playlistService.setCurrentIndex(this.currentIndex + 1);
    } else {
      this.playlistService.setCurrentIndex(0);
    }
    this.playlistService.setCurrentAudioTrack(this.currentIndex, this.playlist);
    this.playlistService.setAudioStatus('playing');
  };

  pause(): void {
    this.playlistService.setAudioStatus('paused');
    this.audioElement = document.getElementById(
      'current-track'
    ) as HTMLAudioElement;
    this.audioElement.pause();
  }

  stop(): void {
    this.playlistService.setAudioStatus('stopped');
    this.audioElement = document.getElementById(
      'current-track'
    ) as HTMLAudioElement;
    this.audioElement.pause();
    this.audioElement.currentTime = 0;
  }

  setAudioStatus(audioStatus: AudioStatus) {
    this.playlistService.setAudioStatus(audioStatus);
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
}
