import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Playlist} from '../../models/playlist';
import {Config} from "../../common/config";

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
}
