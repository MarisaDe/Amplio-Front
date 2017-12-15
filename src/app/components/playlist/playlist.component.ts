import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {Playlist} from '../../models/playlist';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AudioService} from '../../services/audio/audio.service';
import {Config} from '../../common/config';
import {Song} from "../../models/song";

declare var jQuery: any;

@Component({
  selector: 'playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css', '../../main.css']
})
export class PlaylistComponent implements OnInit {
  currentUser: User;
  playlist: Playlist;
  hideObject: string;
  deleted = false;
  private playPauseImg = Config.PLAY_IMAGE;
  isFollowing = false;
  editInfo: any = {};
  private displayImage: any;
  files: FileList;

  constructor(private userService: UserService,
              private playlistService: PlaylistService,
              private audioService: AudioService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  toggleFollow() {
    if (!this.isFollowing) {
      this.userService.followPlaylist(this.playlist.id).subscribe(
        resp => {
          console.log(resp);
          this.currentUser.followedPlaylists = Playlist.generatePlaylistList(resp);
          this.isFollowing = true;
        },
        err => {
          console.error(err.message);
        }
      );
    } else {
      this.userService.unfollowPlaylist(this.playlist.id).subscribe(
        resp => {
          console.log('Playlist Unfollowed!');
          this.currentUser.followedPlaylists = Playlist.generatePlaylistList(resp);
          this.isFollowing = false;
        },
        err => {
          console.error(err.message);
        }
      );
    }
  }

  editPlaylist() {
    console.log(this.editInfo.image);
    if (this.editInfo.image == null) {
      this.editInfo.image = this.playlist.image;
    }
    this.playlistService.editPlaylist(this.playlist.id, this.editInfo).subscribe(
      resp => {
        console.log(resp);
        jQuery('#editPlaylist').modal('hide');
        for (let i = 0; i < this.currentUser.playlists.length; i++) {
            if (this.currentUser.playlists[i].id === this.playlist.id) {
              this.playlist = new Playlist(resp);
              this.currentUser.playlists[i] = this.playlist;
            }
        }
      },
      err => {
        console.error(err.message);
        jQuery('#editPlaylist').modal('hide');
      }
    );
  }

  onChange(event) {
    this.files = event.target.files;
    const reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsDataURL(this.files[0]);
  }

  handleReaderLoaded(e) {
    const reader = e.target;
    this.displayImage = reader.result;
    this.editInfo.image = this.displayImage;
  }
  // playPlaylist(songId: number = 0) {
  //   let index = -1;
  //   let songList = this.playlist.songs;
  //   if (songId) {
  //     for (const i in songList) {
  //       if (songList[i].id === songId) {
  //         index = parseInt(i, 10);
  //       }
  //     }
  //   } else {
  //     index = 0;
  //   }
  //   songList = [...songList.slice(index, songList.length), ...songList.slice(0, index)];
  //   this.audioService.setQueue(songList);
  //   // let howlList: Array<Howl> = [];
  // }

  playPlaylist(songId: number = 0) {
    console.log(songId);
    this.playlistService.playSongList(this.playlist.songs, songId);
  }
  navigate() {
    this.router.navigateByUrl('/user');
    this.router.navigate(['this.playlist.owner.id']);
  }

  togglePlay() {
    if (this.playPauseImg === Config.PAUSE_IMAGE) {
      this.playPauseImg = Config.PLAY_IMAGE;
    } else {
      this.playPauseImg = Config.PAUSE_IMAGE;
    }
  }

  getMinSec(value: number): string {
    const min = Math.floor(value / 60);
    const sec = Math.round(value % 60);
    let minstr = String(min);
    let secstr = String(sec);
    if (min < 10) {
      minstr = '0' + minstr;
    }
    if (sec < 10) {
      secstr = '0' + secstr;
    }
    return minstr + ':' + secstr;
  }

  hide() {
    this.hideObject = 'none';
  }

  addToQueue() {
    this.audioService.addSongsToQueue(this.playlist.songs);
  }

  deletePlaylist() {
    const i = this.currentUser.playlists.indexOf(this.playlist);
    this.currentUser.playlists.splice(i, 1);
    this.playlistService.deletePlaylist(this.playlist.id).subscribe(
      resp => {
        console.log(resp);
        this.deleted = true;
        jQuery('#delPlaylist').modal('hide');
        this.router.navigate(['/home']);
      },
      err => {
        console.error(err.message);
        jQuery('#delPlaylist').modal('hide');
      }
    );
  }

  saveSongToLibrary(songId: number) {
    // let song: Song;
    // for (let i = 0; i < this.playlist.songs.length; i++) {
    //   if (this.playlist.songs[i].id === songId) {
    //     this.currentUser.library.addSong()
    //   }
    // }
  }

  ngOnInit() {
    this.hideObject = 'show';
    this.userService.currentUser.subscribe(user => this.currentUser = user);

    this.route.params.subscribe( params => {
      this.playlistService.getPlaylist(params['id']).subscribe(
        resp => {
          console.log(params['id']);
          this.playlist = new Playlist(resp);
        },
        err => {
          console.error(err);
        }
      );
    });
  }

}
