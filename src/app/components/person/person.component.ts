import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {ActivatedRoute} from '@angular/router';
import {Config} from '../../common/config';
import {HttpClient} from '@angular/common/http';
import {Follower} from '../../models/follower';

@Component({
  selector: 'person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css', '../../main.css'],
})
export class PersonComponent implements OnInit {
  currentUser: User;
  person: User; // TODO Artist
  personId: any;
  isFollowing: boolean;
  name: string;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private http: HttpClient) {
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
      this.person = this.currentUser;

      // User service getUser doesn't return anything
      // this.person = this.userService.getUser(params['id']);
      //
      // TODO: Get this to work using UserService instead of having it here
      // const resp = this.http.get(Config.API_URI + 'user/' + this.personId)
      // this.person = new User(resp);
      // this.name = this.person.name;
      // console.log('THIS PERSON SHOULD BE GOOD OK');
      // console.log(this.person);
      // const follower = new Follower(this.person);
      // if (this.currentUser.following.indexOf(follower) > -1) {
      //   this.isFollowing = true;
      // } else {
      //   this.isFollowing = false;
      // }
    });
  }
}
