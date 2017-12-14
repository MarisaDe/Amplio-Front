import {Song} from './song';
import {Album} from './album';

export class Library {
  private _songs: Song[];
  private _albums: Album[];

  constructor() {
    this._songs = [];
    this._albums = [];
  }

  get songs(): Song[] {
    return this._songs;
  }

  set songs(value: Song[]) {
    this._songs = value;
  }

  get albums(): Album[] {
    return this._albums;
  }

  set albums(value: Album[]) {
    this._albums = value;
  }

  addAlbum(album: Album) {
    this._albums.push(album);
  }

  addSong(song: Song) {
    this._songs.push(song);
  }

  removeAlbum(albumId: number) {
    let index = -1;
    for (let i = 0; i < this._albums.length; i++) {
      if (this._albums[i].id === albumId) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      this._albums.splice(index, 1);
    }
  }

  removeSong(songId: number) {
    let index = -1;
    for (let i = 0; i < this._songs.length; i++) {
      if (this._songs[i].id === songId) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      this._songs.splice(index, 1);
    }
  }
}
