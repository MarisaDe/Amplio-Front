import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {Playlist} from '../../models/playlist';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AudioService} from '../../services/audio/audio.service';
import {Song} from '../../models/song';
import {Config} from '../../common/config';

@Component({
  selector: 'songqueue',
  templateUrl: './songqueue.component.html',
  styleUrls: ['./songqueue.component.css', '../../main.css']
})
export class SongqueueComponent implements OnInit {
  currentUser: User;
  private songQueue: Array<Song>;
  private song: Song;
  private playPauseImg = Config.PLAY_IMAGE;

  constructor(private audioService: AudioService,
              private userService: UserService) {}

  resetQueue() {
    this.audioService.setQueue([]);
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
    this.audioService.songQueue.subscribe(songQueue => {
      this.songQueue = this.audioService.getRemainingQueue();
    });
    this.audioService.currentSong.subscribe(song => {
      this.song = song;
      this.songQueue = this.audioService.getRemainingQueue();
    });
    console.log(this.songQueue);
  }
}
