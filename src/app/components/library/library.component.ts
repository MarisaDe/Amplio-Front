import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {Playlist} from '../../models/playlist';
import {Library} from "../../models/library";
import {AudioService} from "../../services/audio/audio.service";
import {Song} from "../../models/song";

@Component({
  selector: 'library',
  templateUrl: './library.component.html',
  styleUrls: ['../../main.css', './library.component.css']
})
export class LibraryComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService,
              private playlistService: PlaylistService,
              private audioService: AudioService) {
    console.log('howdy from the home compenent!');

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

  ngOnInit() {
    console.log('hello from library component!');
    this.userService.currentUser.subscribe(user => this.currentUser = user);

  }
}
