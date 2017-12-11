import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {Playlist} from '../../models/playlist';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AudioService} from '../../services/audio/audio.service';
import {Config} from "../../common/config";

@Component({
  selector: 'playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css', '../../main.css']
})
export class PlaylistComponent implements OnInit {
  currentUser: User;
  playlist: Playlist;
  hideObject: string;
  private playPauseImg = Config.PLAY_IMAGE;

  constructor(private userService: UserService,
              private playlistService: PlaylistService,
              private audioService: AudioService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  playPlaylist(songId: number) {
    let index = -1;
    let songList = this.playlist.songs;
    for (const i in songList) {
      if (songList[i].id === songId) {
        index = parseInt(i,  10);
      }
    }
    songList = [...songList.slice(index, songList.length), ...songList.slice(0, index)];
    this.audioService.setQueue(songList);
    // let howlList: Array<Howl> = [];
  }

  navigate() {
    this.router.navigateByUrl('/user');
    this.router.navigate(['this.playlist.owner.id']);
  }

  togglePlay() {
    if (this.playPauseImg === Config.PAUSE_IMAGE) {
      this.playPauseImg = Config.PLAY_IMAGE;
    } else {
      this.playPauseImg = Config.PAUSE_IMAGE;
    }
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

  hide() {
    this.hideObject = 'none';

  }
  ngOnInit() {
    this.hideObject = 'show';
    this.userService.currentUser.subscribe(user => this.currentUser = user);
    this.playlistService.getPlaylist(this.route.snapshot.params['id']).subscribe(
      resp => {
        console.log('Playlist Page: ' + resp);
        this.playlist = new Playlist(resp);
        console.log(this.playlist);
      },
      err => {
        console.error(err);
      }
    );
  }

}
