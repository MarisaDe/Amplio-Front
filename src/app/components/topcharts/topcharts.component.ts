import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {SongService} from "../../services/song/song.service";
import {Playlist} from "../../models/playlist";
import {AudioService} from "../../services/audio/audio.service";

@Component({
  selector: 'topcharts',
  templateUrl: './topcharts.component.html',
  styleUrls: ['../../main.css', '../playlist/playlist.component.css']
})
export class TopchartsComponent implements OnInit {
  currentUser: User;
  playlist: Playlist;

  constructor(private userService: UserService,
              private playlistService: PlaylistService,
              private audioService: AudioService) {

  }

  addToQueue() {
    this.audioService.addSongsToQueue(this.playlist.songs);
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


  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
    this.playlistService.getTopcharts().subscribe(
      resp => {
        this.playlist = new Playlist(resp);
      },
      err => {
        console.error(err.message);
      }
    );
  }
}
