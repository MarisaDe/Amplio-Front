
import {User} from './user';
import {Song} from './song';
import {Follower} from './follower';
import {Config} from "../common/config";

export class Playlist {
  private _id: number;
  private _description: string;
  private _image: string;
  private _owner: Follower;
  private _songs: Array<Song>;
  private _title: string;
  private _isPublic: boolean;

  constructor(playlist: any) {
    // console.log(playlist);
    this._id = playlist.id;
    this._isPublic = playlist.isPublic;
    this._description = playlist.description;
    if (playlist.image != null) {
      this._image = playlist.image;
    } else {
      this._image = Config.ALBUM_DEFAULT_IMAGE;
    }
    this._title = playlist.title;
    if (playlist.owner != null) {
      this._owner = new Follower(playlist.owner);
    }
    this._songs = [];
    for (const song of playlist.songs) {
      this._songs.push(new Song(song));
    }
  }

  get isPublic(): boolean {
    return this._isPublic;
  }

  set isPublic(value: boolean) {
    this._isPublic = value;
  }

  static generatePlaylistList(playlists: any): Playlist[] {
    const playlistList: Playlist[] = [];
    for (const playlist of playlists) {
      playlistList.push(new Playlist(playlist));
    }
    return playlistList;
  }

  static generateUserPlaylists(user: any): Playlist[] {
    const playlists: any = user.playlists || [];
    const playlistList: Playlist[] = [];
    for (const playlist of playlists) {
      console.log(playlist);
      const p = new Playlist(playlist);
      p.owner = new Follower(user);
      playlistList.push(p);
    }
    return playlistList;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get owner(): Follower {
    return this._owner;
  }

  set owner(value: Follower) {
    this._owner = value;
  }

  get songs(): Array<Song> {
    return this._songs;
  }

  set songs(value: Array<Song>) {
    this._songs = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
}
