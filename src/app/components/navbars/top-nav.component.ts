import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {AuthService} from '../../services/auth/auth.service';
import {Config} from "../../common/config";
import {ActivatedRoute, Router} from "@angular/router";

declare var jQuery: any;

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['../../main.css', './top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  currentUser: User;
  private displayImage: any;
  private readonly logoImg = Config.LOGO_SMALL_IMAGE;
  private readonly ccardImg = Config.CREDIT_CARDS_IMAGE;
  private monthYear: Array <number>;
  private dismiss: any;
  files: FileList;
  info: any = {};

  constructor(private userService: UserService,
              private authService: AuthService,
              private route: Router) {
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
    if (this.currentUser != null) {
      this.displayImage = this.currentUser.profilePicture;
    }
    this.monthYear = [];
    for ( let i = 17; i < 60; i++) {
      this.monthYear.push(i);
    }
  }

  performUpgrade() {
    console.log('Upgrade was clicked!');
    this.userService.upgradeUser(this.info).subscribe(
      resp => {
        console.log(resp);
        jQuery('#upgrade').modal('hide');
      },
      err => {
        console.error(err.message);
        jQuery('#upgrade').modal('hide');
      }
    );
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
    const reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsDataURL(this.files[0]);
  }

  handleReaderLoaded(e) {
    const reader = e.target;
    this.displayImage = reader.result;
  }

  reset() {
    this.displayImage = Config.PROFILE_DEFAULT_IMAGE;
  }
  setImg() {
    this.currentUser.profilePicture = this.displayImage;
    this.dismiss = 'modal';
    jQuery('#progImg').modal('hide');
  }
}
