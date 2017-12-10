import { Injectable } from '@angular/core';
import {User} from '../../models/user';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {UserService} from '../user/user.service';
import {Observable} from 'rxjs/Observable';
import {Config} from "../../common/config";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private userService: UserService, private router: Router) { }

  login(attempt: any): Observable<any> {
    return this.http.post(Config.API_URI + 'session/login', attempt, { withCredentials: true });

  }

  logout() {
    this.userService.setUser(null);
    localStorage.removeItem('currentUser');
    this.http.post(Config.API_URI + 'session/logout', null, { withCredentials: true })
      .subscribe(
        resp => {},
        err => {}
      );
    this.router.navigate(['/login']);
  }

  register(model: any): Observable<any> {
    return this.http.post(Config.API_URI + 'session/register', model, { withCredentials: true });
  }
}
