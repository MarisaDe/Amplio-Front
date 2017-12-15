import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Config} from '../../common/config';

@Injectable()
export class ArtistService {
  constructor(private http: HttpClient, private router: Router) {
  }

  getArtist(id: string) {
    return this.http.get(Config.API_URI + 'artist/' + id, {withCredentials: true});
  }

  getRelatedArtists(id: string) {
    return this.http.get(Config.API_URI + 'artist/related/' + id, {withCredentials: true});
  }

  search(query: string) {
    return this.http.get(Config.API_URI + 'artist/search/' + query,{withCredentials: true });
  }
}
