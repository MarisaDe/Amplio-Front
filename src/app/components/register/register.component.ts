import {Component, OnInit} from '@angular/core';
import {AlertService} from '../../services/alert/alert.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['../../main.css', './register.component.css']
})
export class RegisterComponent {

  newUser: any = {};

  constructor(private authService: AuthService,
              private alertService: AlertService,
              private router: Router) { }

  performRegister() {
    console.log('register was clicked!');
    this.authService.register(this.newUser).subscribe(
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
