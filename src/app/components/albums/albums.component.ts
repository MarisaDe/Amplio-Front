import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {SongService} from "../../services/song/song.service";

@Component({
  selector: 'albums',
  templateUrl: './albums.component.html',
  styleUrls: ['../../main.css', './albums.component.css']
})
export class AlbumsComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService,
              private songService: SongService) {

  }
  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);

  }
}
