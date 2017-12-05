import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {User} from '../models/user';
import {AlertService} from "../services/alert.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../main.css', './login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  private attempt: any = {};
  private currentUser: User;

  constructor(private authService: AuthService,
              private alertService: AlertService,
              private userService: UserService,
              private router: Router) { }

  performLogin() {
    console.log('Login was clicked!');
    this.authService.login(this.attempt).subscribe(
      resp => {
        console.log(resp);
        const newUser = new User(resp);
        this.userService.setUser(newUser);
        console.log(newUser);
        this.router.navigate(['/home']);
      },
      err => {
        console.error(err.message);
        this.alertService.error(err.message);
      }
    );
  }

  ngOnInit() {
    this.authService.logout();
  }

}
