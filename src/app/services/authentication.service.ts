import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const attempt = {
      username: username,
      password: password
    };
    return this.http.post('http://localhost:8080/api/user/login', attempt);
  }

  register(username: string, password: string, firstName: string, lastName: string, email: string) {
    const reg = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email
    };
    return this.http.post('http://localhost:8080/api/user/register', reg);
  }

}
