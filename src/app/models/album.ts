import {Artist} from './artist';
import {Config} from '../common/config'

export class Album {
  private _id: number;
  private _artist: Artist;
  private _title: string;
  private _image: string;
  private _date: Date;

  constructor(album: any) {
    this._id = album.id;
    this._title = album.title;
    this._date = new Date(album.date);
    this._artist = new Artist(album.artist);
    if (album.image == null) {
      this._image = Config.ALBUM_DEFAULT_IMAGE;
    }
    this._image = Config.ALBUM_IMAGES + album.image;
  }

  replaceAll(input: string, find: string, replace: string): string {
    return input.replace(new RegExp(find, 'g'), replace);
  }

  // static generateArtistList(artists: any): Artist[] {
  //   const artistList: Artist[] = [];
  //   for (const artist of artists) {
  //     artistList.push(new Artist(artists));
  //   }
  //   return artistList;
  // }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get artist(): Artist {
    return this._artist;
  }

  set artists(value: Artist) {
    this._artist = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }
}
