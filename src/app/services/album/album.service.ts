import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Playlist} from '../../models/playlist';
import {Config} from '../../common/config';
import {Observable} from 'rxjs/Observable';
import {Album} from '../../models/album';

@Injectable()
export class AlbumService {

  constructor(private http: HttpClient, private router: Router) { }

  getAlbum(albumId: number) {
    return this.http.get(Config.API_URI + 'album/' + albumId, {withCredentials: true});
  }
  getAlbumByArtist(artistId: number){
    return this.http.get(Config.API_URI + 'album/artist/' + artistId,{withCredentials: true});
  }
  getRelatedAlbums(albumId: number){
    return this.http.get(Config.API_URI + 'album/related/' + albumId,{withCredentials: true});
  }


}
