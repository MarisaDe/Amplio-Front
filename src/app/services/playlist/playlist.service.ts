import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Playlist} from '../../models/playlist';
import {Config} from '../../common/config';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PlaylistService {

  private genrePlaylistSource = new BehaviorSubject<Array<Playlist>>(null);
  public genrePlaylist = this.genrePlaylistSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  setGenrePlaylists(playlists: Playlist[]) {
    this.genrePlaylistSource.next(playlists);
  }

  getGenrePlaylists() {
    // return this.http.get(Config.API_URI + 'playists/genres');
    return this.http.get(Config.API_URI + 'playlist/generated', {withCredentials: true});
  }

  getPlaylist(playlistId: number) {
    return this.http.get(Config.API_URI + 'playlist/' + playlistId, {withCredentials: true});
  }

  createPlaylist(playlist: any): Observable<any> {
    return this.http.post(Config.API_URI + 'playlist/create', playlist, {withCredentials: true});
  }

  deletePlaylist(playlistId: number): Observable<any> {
    return this.http.delete(Config.API_URI + 'playlist/delete/' + playlistId, {withCredentials: true});
  }
}
