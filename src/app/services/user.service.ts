import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {

  private userSource = new BehaviorSubject<User>(null);
  public currentUser = this.userSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  updateCurrentUser(user: User) {
    this.userSource.next(user);
  }

  login(userName: string, password: string) {
    const body = {
      userName: userName,
      password: password
    };
    return this.http.post('http://localhost:8080/api/user/login', body).subscribe(
      resp => {
        console.log(resp);
        const newUser = new User(resp);
        this.userSource.next(newUser);
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
      }
    );
  }

  logout() {
    this.userSource.next(null);
    this.router.navigate(['/login']);
  }

  register(userName: string, password: string, firstName: string, lastName: string, email: string) {
    const body = {
      userName: userName,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email
    };
    return this.http.post('http://localhost:8080/api/user/register', body).subscribe(
      resp => {
        console.log(resp);
        this.router.navigate(['/login']);
      },
      err => {
        console.error(err);
      }
    );
  }


  follow(userId: number) {
    const body = {
      userId: userId
    };
    this.http.post('http://localhost:8080/api/user/follow', body)
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
