import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {ActivatedRoute} from '@angular/router';
import {AdsService} from '../../services/ads/ads.service';

@Component({
  selector: 'ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css', '../../main.css'],
})
export class AdComponent implements OnInit {
  currentUser: User;
  adImg: string;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private adsService: AdsService) {
  }
  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
    this.adImg = this.adsService.getRandomAd();
  }
}
