import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class PlaylistService {

  constructor(private http: HttpClient, private router: Router) { }

  getGenrePlaylists(userId: number) {
    // return this.http.get('http://localhost:8080/api/playists/genres');
    return this.http.get('http://localhost:8080/api/playlist/generated', {withCredentials: true});
  }

}
