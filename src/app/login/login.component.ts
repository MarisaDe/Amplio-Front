import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../main.css','./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  private user: User;
  name: string;
  password: string;

  constructor(private auth: AuthenticationService, private router: Router) { }

  performLogin() {
    this.user = new User(this.name);
    console.log('login was clicked!');
    this.auth.login(this.name, this.password).subscribe(
      resp => {
        console.log(resp);
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    console.log('hello from login component!');
  }

}
