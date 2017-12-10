import {Song} from './song';
import {Album} from './album';

export class Artist {
  private _id: number;
  private _name: string;
  private _biblio: number;
  // private _concerts: Concert[];
  private _uploadRequests: Song[];
  private _deleteRequests: Song[];

  constructor(artist: any) {
    if (artist != null) {
      this._id = artist.id;
      this._name = artist.name;
      const name_tokens = artist.name.split(' ');
      let i = 0;
      for (i = 0; i < name_tokens.length; i++) {
        name_tokens[i] = name_tokens[i].charAt(0).toUpperCase() + name_tokens[i].substring(1);
      }
      this._name = name_tokens.join(' ');
      this._biblio = artist.bibliography;
      this._uploadRequests = artist.uploadRequests;
      this._deleteRequests = artist.deleteRequests;
    }
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get biblio(): number {
    return this._biblio;
  }

  set bilbio(value: number) {
    this._biblio = value;
  }

  get uploadRequests(): Song[] {
    return this._uploadRequests;
  }

  set uploadRequests(value: Song[]) {
    this._uploadRequests = value;
  }

  get deleteRequests(): Song[] {
    return this._deleteRequests;
  }

  set deleteRequests(value: Song[]) {
    this._deleteRequests = value;
  }
}


