import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../services/user.service';
import {User} from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../main.css', './login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  private name: string;
  private password: string;
  private currentUser: User;

  constructor(private userService: UserService) { }

  performLogin() {
    console.log('Login was clicked!');
    this.userService.login(this.name, this.password);
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }

}
