import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Config} from '../../common/config';
import {Playlist} from "../../models/playlist";

@Injectable()
export class UserService {

  private userSource = new BehaviorSubject<User>(null);
  public currentUser = this.userSource.asObservable();
  private personSource = new BehaviorSubject<User>(null);
  public person = this.personSource.asObservable(); // TODO: Artist
  private playlistSource = new BehaviorSubject<Playlist>(null);
  public playlists = this.playlistSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }


  setUser(user: User) {
    this.userSource.next(user);
  }

  getUser(userId: number) {
    return this.http.get(Config.API_URI + 'user/' + userId, {withCredentials: true});
  }

  getPlaylists() {
    return this.http.get(Config.API_URI + 'user/playlists', {withCredentials: true});
  }

  followUser(userId: number) {
    const body = {
      id: userId
    };
    return this.http.post(Config.API_URI + 'user/follow/' + userId, body, {withCredentials: true });
  }

  unfollowUser(userId: number) {
    const body = {
      id: userId
    };
    return this.http.post(Config.API_URI + 'user/unfollow/' + userId, body, {withCredentials: true });
  }

  followArtist(artistId: number) {
    const body = {
      id: artistId
    };
    return this.http.post(Config.API_URI + 'user/followartist/' + artistId, body, {withCredentials: true });
  }

  unfollowArtist(artistId: number) {
    return this.http.post(Config.API_URI + 'user/unfollowartist/' + artistId, null, {withCredentials: true });
  }

  search(query: string) {
    return this.http.get(Config.API_URI + 'user/search/' + query,{withCredentials: true });
  }
  followPlaylist(playlistId: number) {
    return this.http.post(Config.API_URI + 'user/followplaylist/' + playlistId, null, {withCredentials: true });
  }

  unfollowPlaylist(playlistId: number) {
    return this.http.post(Config.API_URI + 'user/unfollowplaylist/' + playlistId, null, {withCredentials: true });
  }

  saveSong(songId: number) {
    return this.http.post(Config.API_URI + 'user/savesong/' + songId, null, {withCredentials: true});
  }

  unsaveSong(songId: number) {
    return this.http.post(Config.API_URI + 'user/unsavesong/' + songId, null, {withCredentials:true});
  }

  saveAlbum(albumId: number) {
    return this.http.post(Config.API_URI + 'user/savealbum/' + albumId, null, {withCredentials: true});
  }

  unsaveAlbum(albumId: number) {
    return this.http.post(Config.API_URI + 'user/unsavealbum/' + albumId, null, {withCredentials: true});
  }
}
