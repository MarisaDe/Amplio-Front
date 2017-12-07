import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['../../main.css', './top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService, private authService: AuthService) {
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }

  getName(): string {
    let name = null;
    if (this.currentUser != null) {
      name = this.currentUser.name;
    }
    return name;
  }

  getUserPage() {
    this.userService.getUser(this.currentUser.id);
  }

  logout() {
    this.authService.logout();
    console.log('logout has been clicked. omg wow yay! i cant even');
  }
}
