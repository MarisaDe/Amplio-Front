import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { User } from '../models/user';

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

  constructor() { }

  login() {
    this.user = new User(this.name);
    console.log('login was clicked!');
    console.log(this.name);
    console.log(this.password);
    console.log(this.user);
  }

  ngOnInit() {
    console.log('hello from login component!');
  }

}
