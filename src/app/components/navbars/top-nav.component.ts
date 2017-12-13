import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {AuthService} from '../../services/auth/auth.service';
import {Config} from "../../common/config";
import {ActivatedRoute, Router} from "@angular/router";

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
  files : FileList;

  constructor(private userService: UserService,
              private authService: AuthService,
              private route: Router) {
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
    this.monthYear = [];
    for ( let i = 17; i < 60; i++) {
      this.monthYear.push(i);
    }
  }

  enterSearch(value: string) {
    this.route.navigate(['/search/' + value]);
  }
  logout() {
    this.authService.logout();
    // console.log('logout has been clicked. omg wow yay! i cant even');
  }

  onChange(event) {
    this.files = event.target.files;
    console.log(this.files);
  }
  setImg(value: any) {
    console.log('HELLO FROM CHANGE IMG');
    this.currentUser.profilePicture = value[0];
  }
}
