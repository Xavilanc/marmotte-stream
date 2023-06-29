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

  protected playlistService = inject(PlaylistService);
  readonly playlist$ = this.playlistService.playlist$;
  readonly currentIndex$ = this.playlistService.currentIndex$;
  readonly currentAudioTrack$ = this.playlistService.currentAudioTrack$;
  // readonly isPlaying$ = this.playlistService.isPlaying$;
  readonly audioStatus$ = this.playlistService.audioStatus$;

  protected isPlaying!: boolean;

  ngOnInit(): void {
    this.playlist$.subscribe((value) => (this.playlist = value));
    this.currentAudioTrack$.subscribe((value) => {
      this.currentTrack = value;
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
    const audioElement = document.getElementById(
      'current-track'
    ) as HTMLAudioElement;
    audioElement.src = this.currentTrack.url;
    audioElement.currentTime = this.currentTime;
    audioElement.play();
    audioElement.addEventListener('ended', this.handlePlaylist);

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

  handlePlaylist = () => {
    this.playlistService.setAudioStatus('ended');
    const audioElement = document.getElementById(
      'current-track'
    ) as HTMLAudioElement;
    audioElement.removeEventListener('ended', this.handlePlaylist);
    this.currentTime = 0;
    if (this.currentIndex < this.playlistService.getPlaylistLength() - 1) {
      this.playlistService.setCurrentAudioTrack(
        this.currentIndex,
        this.playlist
      );
      this.playlistService.setCurrentIndex(this.currentIndex + 1);
      this.playlistService.setCurrentAudioTrack(
        this.currentIndex,
        this.playlist
      );
      this.playlistService.setAudioStatus('playing');
    } else {
      this.playlistService.setCurrentIndex(0);
      this.playlistService.setCurrentAudioTrack(0, this.playlist);
      this.playlistService.setAudioStatus('playing');
    }
  };

  pause(): void {
    this.playlistService.setAudioStatus('paused');
    const audioElement = document.getElementById(
      'current-track'
    ) as HTMLAudioElement;
    audioElement.pause();
  }

  stop(): void {
    this.playlistService.setAudioStatus('stopped');
    const audioElement = document.getElementById(
      'current-track'
    ) as HTMLAudioElement;
    audioElement.pause();
    audioElement.currentTime = 0;
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
