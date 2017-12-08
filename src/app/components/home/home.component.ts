import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {Playlist} from "../../models/playlist";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['../../main.css', './home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  genrePlaylists: Playlist[];

  constructor(private userService: UserService, private playlistService: PlaylistService) {
    console.log('howdy from the home compenent!');

  }

  loadGenrePlaylists() {
    this.playlistService.getGenrePlaylists(this.currentUser.id).subscribe(
      resp => {
        this.genrePlaylists = Playlist.generatePlaylistList(resp);
        console.log(this.genrePlaylists);
      },
      err => {
        console.error(err);
      }
    );
  }

  ngOnInit() {
    console.log('hello from home component!');
    this.userService.currentUser.subscribe(user => this.currentUser = user);
    this.loadGenrePlaylists();
  }
}
