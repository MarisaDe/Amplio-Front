import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Playlist} from "../../models/playlist";

@Injectable()
export class PlaylistService {

  private genrePlaylistSource = new BehaviorSubject<Playlist[]>(null);
  public genrePlayist = this.genrePlaylistSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  setGenrePlaylists(playlists: Playlist[]) {
    this.genrePlaylistSource.next(playlists);
  }

  getGenrePlaylists(userId: number) {
    // return this.http.get('http://localhost:8080/api/playists/genres');
    return this.http.get('http://localhost:8080/api/playlist/generated', {withCredentials: true});
  }

}
