import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/user';
import {Config} from '../../common/config';
import {Playlist} from '../../models/playlist';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css', '../../main.css']
})
export class LeftNavComponent implements OnInit {
  currentUser: User;
  private playlistImg = Config.ALBUM_DEFAULT_IMAGE;
  playlist: any = {};
  userPlaylists: any;
  followedPlaylists: any;

  constructor(private userService: UserService,
              private playlistService: PlaylistService,
              route: ActivatedRoute) {
  }

  // createPlaylist() {
  //   if (this.playlist.image == null) {
  //     this.playlist.image = Config.ALBUM_DEFAULT_IMAGE;
  //   }
  //   // this.playlist.owner = this.currentUser.id;
  //   this.playlistService.createPlaylist(this.playlist).subscribe(
  //     resp => {
  //       console.log(resp);
  //       this.currentUser.playlists = Playlist.generateUserPlaylists(resp);
  //       console.log(this.userPlaylists);
  //     },
  //     err => {
  //       console.error(err.message);
  //     }
  //   );
  // }
  createPlaylist() {
    if (this.playlist.image == null) {
      this.playlist.image = Config.ALBUM_DEFAULT_IMAGE;
    }
    this.playlistService.createPlaylist(this.playlist).subscribe(
      resp => {
        console.log(resp);
        this.playlist = new Playlist(resp);
        this.playlist.owner = this.currentUser;
        console.log(this.playlist);
        this.userPlaylists.push(this.playlist);
      },
      err => {
        console.error(err.message);
      }
    );
  }

  loadPlaylists() {
    this.userService.getPlaylists().subscribe(
      resp => {
        console.log(resp);
        this.userPlaylists = Playlist.generatePlaylistList(resp);
        console.log(this.userPlaylists);
      },
      err => {
        console.error(err);
      }
    );
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
    console.log(this.playlistImg);
    this.loadPlaylists();
    // this.sub = this.route.params.subscribe(params => {
    //   const term = params['term'];
    //   this.service.get(term).then(result => { console.log(result); });
    // });


  }
}
