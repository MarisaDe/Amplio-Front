import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {ActivatedRoute} from '@angular/router';
import {Config} from '../../common/config';
import {HttpClient} from '@angular/common/http';
import {Follower} from '../../models/follower';
import {AdsService} from '../../services/ads/ads.service';
import {Playlist} from '../../models/playlist';
import {PlaylistService} from '../../services/playlist/playlist.service';

@Component({
  selector: 'person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css', '../../main.css'],
})
export class PersonComponent implements OnInit {
  currentUser: User;
  person: any;  // TODO Artist
  isFollowing = false;
  adImg: any;
  name: string;
  showAd = true;
  userPlaylists: any;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private adsService: AdsService,
              private playlistService: PlaylistService) {

  }
  toggleFollow() {
    if (!this.isFollowing) {
      this.userService.followUser(this.person.id).subscribe(
        resp => {
          console.log('User Followed!');
          this.currentUser.following = User.generateFollowerList(resp);
          this.isFollowing = true;
        },
        err => {
          console.error(err.message);
        }
      );
    } else {
      this.userService.unfollowUser(this.person.id).subscribe(
        resp => {
          console.log('User Unfollowed!');
          this.currentUser.following = User.generateFollowerList(resp);
          this.isFollowing = false;
        },
        err => {
          console.error(err.message);
        }
      );
    }
  }

  // loadPlaylists() {
  //   this.playlistService.getPlaylists(this.person.id).subscribe(
  //     resp => {
  //       this.userPlaylists = Playlist.generatePlaylistList(resp);
  //     },
  //     err => {
  //       console.error(err);
  //     }
  //   );
  // }

  checkFollowing() {
    this.isFollowing = false;
    for (const user of this.currentUser.following) {
      if (user && this.person.id === user.id) {
        this.isFollowing = true;
        break;
      }
    }
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
    // this.userService.person.subscribe(person => this.person = person);
    this.route.params.subscribe(params => {
      this.userService.getUser(params['id']).subscribe(
        resp => {
          console.log(resp);
          this.person = new User(resp);
          console.log(this.person);
          // this.loadPlaylists();
          this.checkFollowing();
        },
        err => {
          console.error(err);
        }
      );
    });
  }
}
