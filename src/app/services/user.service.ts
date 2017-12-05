import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {

  private userSource = new BehaviorSubject<User>(null);
  public currentUser = this.userSource.asObservable();
  private personSource = new BehaviorSubject<User>(null);
  public person = this.personSource.asObservable(); // TODO: Artist

  constructor(private http: HttpClient, private router: Router) { }

  login(userName: string, password: string) {
    const body = {
      userName: userName,
      password: password
    };
    return this.http.post('http://localhost:8080/api/user/login', body).subscribe(
      resp => {
        console.log(resp);
        const newUser = new User(resp);
        console.log(newUser);
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

  register(model: any) {
    return this.http.post('http://localhost:8080/api/user/register', model);
  }


  getUser(userId: number) {
    this.http.get('http://localhost:8080/api/user/' + userId)
      .subscribe(
        resp => {
          const newUser = new User(resp);
          this.personSource.next(newUser);
          this.router.navigate(['/user', newUser.id]);
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
