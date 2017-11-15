import {Component, OnInit} from '@angular/core';
import {User} from "../models/user";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['../main.css', './register.component.css']
})
export class RegisterComponent implements OnInit {
  private user: User;
  name: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;

  constructor(private auth: AuthenticationService, private router: Router) { }

  performRegister() {
    this.user = new User(this.name);
    console.log('register was clicked!');
    this.auth.register(this.name, this.password, this.firstName, this.lastName, this.email).subscribe(
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
    console.log('hello from register component!');
  }
}
