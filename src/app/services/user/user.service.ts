import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Config} from "../../common/config";

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

  // TODO : update to not do any router logic here.
  getUser(userId: number) {
    this.http.get(Config.API_URI + 'user/' + userId)
      .subscribe(
        resp => {
          console.log(resp);
          const newUser = new User(resp);
          this.personSource.next(newUser);
          console.log(newUser);
          return newUser;
          // this.router.navigate(['/user', newUser.id]);
        },
        err => {
          console.error(err);
        }
      );
  }

  getPlaylists() {
    return this.http.get(Config.API_URI + 'user/playlists', {withCredentials: true});
  }

  follow(userId: number) {
    const body = {
      userId: userId
    };
    this.http.post(Config.API_URI + 'user/follow', body, { withCredentials: true })
      .subscribe(
        resp => {
          const updatedUser = new User(resp);
          this.userSource.next(updatedUser);
        },
        err => {
          console.error(err);
        }
      );
  }

}
