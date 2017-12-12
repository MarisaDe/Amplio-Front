import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {ActivatedRoute} from '@angular/router';
import {Config} from '../../common/config';
import {HttpClient} from '@angular/common/http';
import {Follower} from '../../models/follower';
import {AdsService} from '../../services/ads/ads.service';
import {Playlist} from '../../models/playlist';
import {PlaylistService} from "../../services/playlist/playlist.service";

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
  userPlaylists: any;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private adsService: AdsService,
              private playlistService: PlaylistService) {
  }
  // follow(userToFollow: any) {
  //   this.currentUser.following.push(userToFollow);
  // }

  // TODO Unfollow User
  toggleFollow() {
    if (!this.isFollowing) {
      this.userService.followUser(this.personId).subscribe(
        resp => {
          console.log('User Followed!');
          this.isFollowing = true;
        },
        err => {
          console.error(err.message);
        }
      );
    } else {
      this.userService.unfollowUser(this.personId).subscribe(
        resp => {
          console.log('User Unfollowed!');
          this.isFollowing = false;
        },
        err => {
          console.error(err.message);
        }
      );
    }
  }

  loadPlaylists() {
    this.playlistService.getPlaylists(this.personId).subscribe(
      resp => {
        this.userPlaylists = Playlist.generatePlaylistList(resp);
      },
      err => {
        console.error(err);
      }
    );
  }

  checkFollowing() {
    if (this.currentUser.following.indexOf(this.person) > -1) {
      this.isFollowing = true;
      console.log('Already following user');
    } else {
      this.isFollowing = false;
      console.log('Havent followed user yet');
    }
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
    this.loadPlaylists();
    this.checkFollowing();
  }
}
