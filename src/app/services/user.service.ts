import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {

  private user: User;

  constructor(private http: HttpClient, private router: Router) { }

  login(userName: string, password: string) {
    const attempt = {
      userName: userName,
      password: password
    };
    return this.http.post('http://localhost:8080/api/user/login', attempt).subscribe(
      resp => {
        console.log(resp);
        this.user = new User(resp);
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
      }
    );
  }

  logout() {
    this.user = null;
    this.router.navigate(['/login']);
  }

  register(userName: string, password: string, firstName: string, lastName: string, email: string) {
    const registration = {
      userName: userName,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email
    };
    return this.http.post('http://localhost:8080/api/user/register', registration).subscribe(
      resp => {
        console.log(resp);
        this.router.navigate(['/home']);
      },
      err => {
        console.error(err);
      }
    );
  }

  get currentUser(): User {
    return this.user;
  }

  search(query: string): any {
    // const params: URLSearchParams = new URLSearchParams();
    // params.set('query', query);
    this.http.get('http://localhost:8080/api/user/search', {params: {query: query}})
      .subscribe(
        resp => {
          return resp;
        },
        err => {
          console.error(err);
        }
      );
  }




}
