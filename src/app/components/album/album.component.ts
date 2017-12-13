import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {AlbumService} from '../../services/album/album.service';
import {Album} from '../../models/album';
import {ActivatedRoute} from '@angular/router';
import {SongService} from '../../services/song/song.service';
import {Playlist} from '../../models/playlist';
import {Song} from '../../models/song';
import {AudioService} from "../../services/audio/audio.service";
import {PlaylistService} from "../../services/playlist/playlist.service";

@Component({
  selector: 'album',
  templateUrl: './album.component.html',
  styleUrls: ['../../main.css', './album.component.css']
})
export class AlbumComponent implements OnInit {
  currentUser: User;
  albumId: number;
  album: Album;
  songs: any;
  songList: any;
  playlist: Playlist;

  constructor(private userService: UserService,
              private songService: SongService,
              private albumService: AlbumService,
              private route: ActivatedRoute,
              private playlistService: PlaylistService) {

  }

  getAlbum() {
    this.albumService.getAlbum(this.albumId).subscribe(
      resp => {
        console.log(resp);
        this.album = new Album(resp);
        // this.album.image = decodeURI(this.album.image);
        console.log(decodeURI(this.album.image));
      });
  }
  loadAlbumSongs() {
    this.songService.getAlbumSongs(this.albumId).subscribe(
      resp => {
        console.log(resp);
        this.songs = resp;
        this.songList = [];
        console.log(this.songs);
        for (const song of this.songs) {
          const newSong = new Song(song);
          this.songList.push(newSong);
        }
        console.log(this.songList);
        console.log(this.album);
      },
      err => {
        console.error(err);
      }
    );
  }

  playAlbum(songId: number = 0) {
    console.log(songId);
    this.playlistService.playPlaylist(this.playlist, songId);
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

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
    this.route.params.subscribe(params => {
      this.albumId = params['id'];
      this.getAlbum();
      this.loadAlbumSongs();
    });
  }
}

