import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { User } from '../models/user';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  private user: User;

  name: string;
  password: string;

  constructor(private auth: AuthenticationService) { }

  performLogin() {
    this.user = new User(this.name);
    console.log('login was clicked!');
    this.auth.login(this.name, this.password);
  }

  ngOnInit() {
    console.log('hello from login component!');
  }

}
