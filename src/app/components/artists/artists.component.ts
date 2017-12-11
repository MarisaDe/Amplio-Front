import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {Playlist} from '../../models/playlist';

@Component({
  selector: 'artists',
  templateUrl: './artists.component.html',
  styleUrls: ['../../main.css', './artists.component.css']
})
export class ArtistsComponent implements OnInit {
  currentUser: User;
  libraryPlaylist: Playlist;

  constructor(private userService: UserService,
              private playlistService: PlaylistService) {

  }
  ngOnInit() {
    console.log('hello from artists component!');
    this.userService.currentUser.subscribe(user => this.currentUser = user);

  }
}
