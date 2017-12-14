import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {Playlist} from '../../models/playlist';
import {Library} from "../../models/library";

@Component({
  selector: 'library',
  templateUrl: './library.component.html',
  styleUrls: ['../../main.css', './library.component.css']
})
export class LibraryComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService,
              private playlistService: PlaylistService) {
    console.log('howdy from the home compenent!');

  }



  ngOnInit() {
    console.log('hello from library component!');
    this.userService.currentUser.subscribe(user => this.currentUser = user);

  }
}
