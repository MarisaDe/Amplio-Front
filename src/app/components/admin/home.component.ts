import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {Playlist} from '../../models/playlist';

@Component({
  selector: 'admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../main.css', './home.component.css']
})
export class AdminHomeComponent implements OnInit {
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
