import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/user';
import {Config} from '../../common/config';
import {Playlist} from '../../models/playlist';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {ActivatedRoute} from '@angular/router';
import {Follower} from "../../models/follower";

declare var jQuery: any;

@Component({
  selector: 'left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css', '../../main.css']
})
export class LeftNavComponent implements OnInit {
  private currentUser: User;
  private playlistImg = Config.ALBUM_DEFAULT_IMAGE;
  private playlist: any = {};

  constructor(private userService: UserService,
              private playlistService: PlaylistService,
              route: ActivatedRoute) {
  }

  createPlaylist() {
    if (this.playlist.image == null) {
      this.playlist.image = Config.ALBUM_DEFAULT_IMAGE;
    }
    this.playlistService.createPlaylist(this.playlist).subscribe(
      resp => {
        console.log(resp);
        const playlist = new Playlist(resp);
        playlist.owner = new Follower ({
          id: this.currentUser.id,
          userName: this.currentUser.userName,
          firstName: this.currentUser.firstName,
          lastName: this.currentUser.lastName,
          profilePicture: this.currentUser.profilePicture
        });
        this.currentUser.playlists.push(playlist);
        jQuery('#addPlaylist').modal('hide');
      },
      err => {
        console.error(err.message);
        jQuery('#addPlaylist').modal('hide');
      }
    );
    this.playlist = {};
  }

  updatePic(fileInput: any) {
    console.log('CHANGING IMAGE');
    this.playlistImg = fileInput.target.files[0];

    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.playlistImg = e.target.result;
    };

    reader.readAsDataURL(fileInput.target.files[0]);
    console.log(this.playlistImg);
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }
}
