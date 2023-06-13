import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Playlist } from '../shared/models/models';
import { PlaylistService } from '../shared/services/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit {
  playlist: Playlist = [];

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.playlistService
      .getPlaylist$()
      .subscribe((value) => (this.playlist = value));
  }

  deleteAudioTrack(index: number): void {
    this.playlistService.deleteAudioTrack(index);
    this.playlistService.getPlaylist$();
  }
}
