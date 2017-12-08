import {Artist} from './artist';

export class Album {
  private _id: number;
  private _artists: Array<Artist>;
  private _title: string;
  private _image: string;
  private _date: Date;

  constructor(album: any) {
    this._id = album.albumId;
    this._title = album.title;
    this._date = new Date(album.date);
    this._image = album.image;
    this._artists = Artist.generateArtistList(album.artists);
  }

  static generateArtistList(artists: any): Artist[] {
    const artistList: Artist[] = [];
    for (const artist of artists) {
      artistList.push(new Artist(artists));
    }
    return artistList;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get artists(): Artist[] {
    return this._artists;
  }

  set artists(value: Artist[]) {
    this._artists = value;
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
