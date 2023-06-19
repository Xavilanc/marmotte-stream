import { Component, OnInit } from '@angular/core';
import { AudioTrack } from '../shared/models/models';
import { AudioService } from '../shared/services/audio/audio.service';
import { PlaylistService } from '../shared/services/playlist/playlist.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css'],
})
export class AudioPlayerComponent implements OnInit{
  currentTrack: AudioTrack = {
    url: '',
    name: '',
  };

  // isPlaying: AudioSta = 'stopping';

  constructor(
    private audioService: AudioService,
    private playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
      this.audioService.getAudioStatus$().subscribe((status) =>)  }
}
