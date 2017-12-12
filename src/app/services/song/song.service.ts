import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Config} from '../../common/config';
import {Observable} from 'rxjs/Observable';
import {Song} from '../../models/song';

@Injectable()
export class SongService {

  constructor(private http: HttpClient, private router: Router) { }

  getAlbumSongs(albumId: number) {
    return this.http.get(Config.API_URI + 'song/album/' + albumId, {withCredentials: true});
  }


}
