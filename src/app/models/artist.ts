import {Song} from './song';
import {Album} from './album';

export class Artist {
  private _id: number;
  private _artistName: string;
  private _biblio: number;
  // private _concerts: Concert[];
  private _albums: Album[];
  private _uploadRequests: Song[];
  private _deleteRequests: Song[];
  // private _label: Label;

  constructor(info: any) {
    this._id = info.id;
    this._artistName = info.artistName;
    this._biblio = info.biblio;
    this._albums = info.albums;
    this._uploadRequests = info.uploadRequests;
    this._deleteRequests = info.deleteRequests;
  }
  generateArtistList(artists: any): Artist[] {
    const artistList: Artist[] = Array<Artist>();
    for (const artist of artists) {
      artistList.push(new Artist(artist));
    }
    return artistList;
  }
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get artistName(): string {
    return this._artistName;
  }

  set artistName(value: string) {
    this._artistName = value;
  }

  get biblio(): number {
    return this._biblio;
  }

  set bilbio(value: number) {
    this._biblio = value;
  }

  get albums(): Album[] {
    return this._albums;
  }

  set albums(value: Album[]) {
    this._albums = value;
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


