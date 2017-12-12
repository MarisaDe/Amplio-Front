import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {ActivatedRoute} from '@angular/router';
import {Config} from '../../common/config';
import {HttpClient} from '@angular/common/http';
import {Follower} from '../../models/follower';
import {AdsService} from '../../services/ads/ads.service';

@Component({
  selector: 'person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css', '../../main.css'],
})
export class PersonComponent implements OnInit {
  currentUser: User;
  person: any;  // TODO Artist
  personId: any;
  isFollowing: boolean;
  adImg: any;
  name: string;
  showAd = true;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private adsService: AdsService) {
  }
  follow(userToFollow: any) {
    this.currentUser.following.push(userToFollow);
  }

  unfollow(userToUnfollow: any) {
    const indexToDel = this.currentUser.following.indexOf(userToUnfollow);
    this.currentUser.following.splice(indexToDel, 1);
  }
  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
    // this.userService.person.subscribe(person => this.person = person);
    this.route.params.subscribe(params => {
      this.personId = params['id'];
      // put this here so it won'to break
      // this.person = this.currentUser;
      this.userService.getUser2(params['id']).subscribe(
        resp => {
          console.log('Playlist Page: ' + resp);
          this.person = new User(resp);
          console.log(this.person);
        },
        err => {
          console.error(err);
        }
      );
    });
  }
}
