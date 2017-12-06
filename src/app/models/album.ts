import {Artist} from './artist';

export class Album {
  private _id: number;
  private _artist: Artist;
  // private _label: Label;
  private _title: string;
  private _image: string;
  private _date: string;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get artist(): Artist {
    return this._artist;
  }

  set artist(value: Artist) {
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

  get date(): string {
    return this._date;
  }

  set date(value: string) {
    this._date = value;
  }
}
