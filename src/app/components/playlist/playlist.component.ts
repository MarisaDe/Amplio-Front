import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {Playlist} from "../../models/playlist";
import {PlaylistService} from "../../services/playlist/playlist.service";
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";

@Component({
  selector: 'playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css', '../../main.css']
})
export class PlaylistComponent implements OnInit {
  currentUser: User;
  playlist: Playlist;

  constructor(private userService: UserService,
              private playlistService: PlaylistService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
    this.playlistService.getPlaylist(this.route.snapshot.params['id']).subscribe(
      resp => {
        console.log('Playlist Page: ' + resp);
        this.playlist = new Playlist(resp);
        console.log(this.playlist);
      },
      err => {
        console.error(err);
      }
    );
  }

}
