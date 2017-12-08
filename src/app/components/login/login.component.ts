import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {User} from '../../models/user';
import {AlertService} from "../../services/alert/alert.service";
import {AuthService} from "../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../main.css', './login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  private attempt: any = {};
  prevUrl: string;

  constructor(private authService: AuthService,
              private alertService: AlertService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  performLogin() {
    console.log('Login was clicked!');
    this.authService.login(this.attempt).subscribe(
      resp => {
        // TODO: remove debug
        console.log(resp);
        const newUser = new User(resp);
        this.userService.setUser(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        // TODO: remove debug
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
