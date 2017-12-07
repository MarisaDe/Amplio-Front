import { Injectable } from '@angular/core';
import {User} from '../../models/user';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {UserService} from '../user/user.service';
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private userService: UserService, private router: Router) { }

  login(attempt: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/user/login', attempt, { withCredentials: true });

  }

  logout() {
    this.userService.setUser(null);
    this.http.post('http://localhost:8080/api/user/logout', null, { withCredentials: true })
      .subscribe();
    this.router.navigate(['/login']);
  }

  register(model: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/user/register', model, { withCredentials: true });
  }
}
