import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../main.css', './login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  name: string;
  password: string;

  constructor(private userService: UserService) { }

  performLogin() {
    console.log('Login was clicked!');
    this.userService.login(this.name, this.password);
  }

}
