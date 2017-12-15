import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {AlbumService} from '../../services/album/album.service';
import {Album} from '../../models/album';
import {ActivatedRoute} from '@angular/router';
import {SongService} from '../../services/song/song.service';
import {Playlist} from '../../models/playlist';
import {Song} from '../../models/song';
import {AudioService} from '../../services/audio/audio.service';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {Config} from "../../common/config";

@Component({
  selector: 'album',
  templateUrl: './album.component.html',
  styleUrls: ['../../main.css', './album.component.css']
})
export class AlbumComponent implements OnInit {
  currentUser: User;
  albumId: number;
  album: Album;
  songList: Song[] = [];
  playlist: Playlist;
  readonly playPauseImg = Config.PLAY_IMAGE;

  constructor(private userService: UserService,
              private songService: SongService,
              private albumService: AlbumService,
              private route: ActivatedRoute,
              private playlistService: PlaylistService,
              private audioService: AudioService) {

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
        const songs: any = resp;
        this.songList = [];
        console.log(songs);
        for (const song of songs) {
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
    // this.playlist.songs = this.songList;
    this.playlistService.playSongList(this.songList, songId);
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

  addSongToQueue(song: Song) {
    this.audioService.addToQueue(song);
  }

  addSongToPlaylist(playlistId: number, songId: number) {
    this.playlistService.addToPlaylist(playlistId, songId).subscribe();
  }

  // generatePlaylist() {
  //   this.playlist = new Playlist(this.album);
  //   console.log(this.playlist);
  // }
  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
    this.route.params.subscribe(params => {
      this.albumId = params['id'];
      this.getAlbum();
      this.loadAlbumSongs();
      // this.generatePlaylist();
    });
  }
}

