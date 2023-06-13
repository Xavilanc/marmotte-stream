import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Playlist } from '../shared/models/models';
import { PlaylistService } from '../shared/services/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit, OnDestroy {
  playlist: Playlist = [];

  subcription: Subscription;

  constructor(private playlistService: PlaylistService) {
    this.subcription = this.playlistService
      .getPlaylist$()
      .subscribe((value) => (this.playlist = value));
  }

  ngOnInit(): void {
    this.playlist = this.playlistService.getPlaylist();
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
