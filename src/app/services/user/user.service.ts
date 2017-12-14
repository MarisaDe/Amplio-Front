import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Config} from '../../common/config';

@Injectable()
export class UserService {

  private userSource = new BehaviorSubject<User>(null);
  public currentUser = this.userSource.asObservable();
  private personSource = new BehaviorSubject<User>(null);
  public person = this.personSource.asObservable(); // TODO: Artist

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
    const body = {
      id: artistId
    };
    return this.http.post(Config.API_URI + 'user/unfollowartist/' + artistId, body, {withCredentials: true });
  }

  search(query: string) {
    return this.http.get(Config.API_URI + 'user/search/' + query,{withCredentials: true });
  }

}
