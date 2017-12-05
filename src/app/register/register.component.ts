import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {AlertService} from '../services/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['../main.css', './register.component.css']
})
export class RegisterComponent {

  newUser: any = {};

  constructor(private userService: UserService,
              private alertService: AlertService,
              private router: Router) { }

  performRegister() {
    console.log('register was clicked!');
    this.userService.register(this.newUser).subscribe(
      resp => {
        console.log(resp);
        this.alertService.success('Success! Welcome to Amplio!', true);
        this.router.navigate(['/login']);
      },
      err => {
        console.error(err.message);
        this.alertService.error(err.message);
      }
    );
  }
}
