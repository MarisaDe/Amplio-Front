import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {Playlist} from "../../models/playlist";

@Component({
  selector: 'playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css', '../../main.css']
})
export class PlaylistComponent implements OnInit {
  currentUser: User;
  playlist: Playlist;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }

}
