import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {AuthService} from '../../services/auth/auth.service';
import {Config} from "../../common/config";

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['../../main.css', './top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  private currentUser: User;
  private readonly logoImg = Config.LOGO_SMALL_IMAGE;
  private readonly ccardImg = Config.CREDIT_CARDS_IMAGE;
  private monthYear: Array <number>;

  constructor(private userService: UserService, private authService: AuthService) {
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
    this.monthYear = [];
    for ( let i = 17; i < 60; i++) {
      this.monthYear.push(i);
    }
  }

  getName(): string {
    let name = null;
    if (this.currentUser != null) {
      name = this.currentUser.name;
    }
    console.log('FROM TOP: ' + this.currentUser);
    return name;
  }

  getUserPage() {
    this.userService.getUser(this.currentUser.id);
  }

  logout() {
    this.authService.logout();
    console.log('logout has been clicked. omg wow yay! i cant even');
  }
  setImg(value: any) {
    console.log('HELLO FROM CHANGE IMG');
    this.currentUser.profilePicture = value[0];
  }
}
