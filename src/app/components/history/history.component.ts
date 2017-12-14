import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {Playlist} from '../../models/playlist';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['../../main.css', './history.component.css']
})
export class HistoryComponent implements OnInit {
  currentUser: User;
  genrePlaylists: Playlist[];

  constructor(private userService: UserService,
              private playlistService: PlaylistService) {

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
  }
}
