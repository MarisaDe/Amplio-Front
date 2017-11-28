import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['../main.css', './register.component.css']
})
export class RegisterComponent {
  name: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;

  constructor(private userService: UserService) { }

  performRegister() {
    console.log('register was clicked!');
    this.userService.register(this.name, this.password, this.firstName, this.lastName, this.email);
  }
}
