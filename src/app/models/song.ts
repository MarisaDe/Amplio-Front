import {Artist} from './artist';
import {Album} from './album';

// TODO: Load path from config
const path = '../../../assets/audio/';

export class Song {
  private _id: number;
  private _artists: Array<Artist>;
  private _album: Album;
  private _duration: number;
  private _lyrics: string;
  private _numPlays: number;
  private _songName: string;
  private _media: HTMLAudioElement;

  constructor(song: any) {
    this._id = song.songId;
    this._album = new Album(song.album);
    this._duration = song.duration;
    this._lyrics = song.lyrics;
    this._numPlays = song.numPlays;
    this._songName = song.songName;
    this._artists = [];
    for (const artist of song.artists) {
      this._artists.push(new Artist(artist));
    }
    if (song.path) {
      this._media = new Audio(path + song.songId + '.mp3');
    } else {
      this._media = new Audio(path + 'dummy.mp3');
    }
  }

  // static generateSongList(songs: any): Song[] {
  //   const songList: Song[] = [];
  //   for (const song of songs) {
  //     songList.push(new Song(song));
  //   }
  //   return songList;
  // }

  get id(): number {
    return this.id;
  }

  set id(value: number) {
    this.id = value;
  }

  get album(): Album {
    return this._album;
  }

  set album(value: Album) {
    this._album = value;
  }

  get duration(): number {
    return this._duration;
  }

  set duration(value: number) {
    this._duration = value;
  }

  get lyrics(): string {
    return this._lyrics;
  }

  set lyrics(value: string) {
    this._lyrics = value;
  }

  get numPlays(): number {
    return this._numPlays;
  }

  set numPlays(value: number) {
    this._numPlays = value;
  }

  get songName(): string {
    return this._songName;
  }

  set songName(value: string) {
    this._songName = value;
  }

  get artists(): Array<Artist> {
    return this._artists;
  }

  get artistsString(): string {
    let artistStr = '';
    for (const artist of this._artists) {
      artistStr += artist.name + ' ';
    }
    return artistStr.trim();
  }

  set artists(value: Array<Artist>) {
    this._artists = value;
  }

  get media(): HTMLAudioElement {
    return this._media;
  }
}
