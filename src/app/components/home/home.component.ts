import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {Playlist} from '../../models/playlist';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['../../main.css', './home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  genrePlaylists: Playlist[];

  constructor(private userService: UserService,
              private playlistService: PlaylistService) {
    console.log('howdy from the home compenent!');

  }

  loadGenrePlaylists() {
    this.playlistService.getGenrePlaylists().subscribe(
      resp => {
        console.log(resp);
        this.playlistService.setGenrePlaylists(Playlist.generatePlaylistList(resp));
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
    this.playlistService.genrePlaylist.subscribe(playlist => this.genrePlaylists = playlist);
    this.loadGenrePlaylists();
    // const p1 = new Playlist(1, '../../assets/images/genre/POP.JPG' , 'Pop');
    // const p2 = new Playlist(2, '../../assets/images/genre/ROCK.JPG' , 'Rock');
    // this.genrePlaylists = [p1, p2];
  }
}
