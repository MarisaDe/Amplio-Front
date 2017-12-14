import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {Playlist} from '../../models/playlist';

@Component({
  selector: 'admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['../../main.css', './admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {
  currentUser: User;
  libraryPlaylist: Playlist;

  constructor(private userService: UserService,
              private playlistService: PlaylistService) {
    console.log('howdy from the ADMIN HOME COMP!');

  }
  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);

  }
}
