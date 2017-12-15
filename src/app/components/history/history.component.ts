import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {Playlist} from '../../models/playlist';
import {Song} from "../../models/song";
import {AudioService} from "../../services/audio/audio.service";
import {Config} from "../../common/config";

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['../../main.css', './history.component.css']
})
export class HistoryComponent implements OnInit {
  currentUser: User;
  genrePlaylists: Playlist[];
  readonly playPauseImg = Config.PLAY_IMAGE;

  constructor(private userService: UserService,
              private playlistService: PlaylistService,
              private audioService: AudioService) {

  }

  getMinSec(value: number): string {
    const min = Math.floor(value / 60);
    const sec = Math.round(value % 60);
    let minstr = String(min);
    let secstr = String(sec);
    if (min < 10) {
      minstr = '0' + minstr;
    }
    if (sec < 10) {
      secstr = '0' + secstr;
    }
    return minstr + ':' + secstr;
  }

  addSongToQueue(song: Song) {
    this.audioService.addToQueue(song);
  }

  addSongToPlaylist(playlistId: number, songId: number) {
    this.playlistService.addToPlaylist(playlistId, songId).subscribe();
  }
  addSongToLibrary(song: Song) {
    this.userService.saveSong(song.id).subscribe();
    this.currentUser.library.addSong(song);
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }
}
