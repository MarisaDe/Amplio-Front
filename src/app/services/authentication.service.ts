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
}
