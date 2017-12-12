import {Artist} from './artist';
import {Album} from './album';
import {Config} from '../common/config';

export class Song {
  private _id: number;
  private _artist: Artist;
  private _album: Album;
  private _duration: number;
  private _lyrics: string;
  private _numPlays: number;
  private _songName: string;
  private _media: HTMLAudioElement;

  constructor(song: any) {
    // console.log(song);
    this._id = song.songId;
    this._album = new Album(song.album);
    this._duration = song.duration;
    this._lyrics = song.lyrics;
    this._numPlays = song.numPlays;
    this._songName = song.songName;
    this._artist = new Artist(song.artist);
    if (song.path) {
      // console.log(Config.AUDIO_PATH + song.songId + '.mp3');
      this._media = new Audio(Config.AUDIO_PATH + song.songId + '.mp3');
    } else {
      this._media = new Audio(Config.AUDIO_PATH + 'dummy.mp3');
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

  get artist(): Artist {
    return this._artist;
  }

  set artist(value: Artist) {
    this._artist = value;
  }

  get media(): HTMLAudioElement {
    return this._media;
  }

  set media(media: HTMLAudioElement) {
    this._media = media;
  }

}
