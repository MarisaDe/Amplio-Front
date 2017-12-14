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

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }
}
