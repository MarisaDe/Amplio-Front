
import {User} from './user';
import {Song} from './song';

export class Playlist {
  private _id: number;
  private _description: string;
  private _image: string;
  private _owner: User;
  private _songs: Array<Song>;
  private _title: string;

  constructor(playlist: any) {
    // console.log(playlist);
    this._id = playlist.id;
    this._description = playlist.description;
    this._image = playlist.image;
    this._title = playlist.title;
    this._owner = new User(playlist.owner);
    this._songs = [];
    for (const song of playlist.songs) {
      this._songs.push(new Song(song));
    }
  }

  static generatePlaylistList(playlists: any): Playlist[] {
    const playlistList: Playlist[] = [];
    for (const playlist of playlists) {
      playlistList.push(new Playlist(playlist));
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

  get owner(): User {
    return this._owner;
  }

  set owner(value: User) {
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
