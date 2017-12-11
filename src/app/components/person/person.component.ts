import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css', '../../main.css'],
})
export class PersonComponent implements OnInit {
  currentUser: User;
  person: User; // TODO Artist

  constructor(private userService: UserService,
              private route: ActivatedRoute) {
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
    console.log(this.currentUser);
    // this.userService.person.subscribe(person => this.person = person);
    this.route.params.subscribe(params => {
      // console.log(params);
      // console.log(params['id']);
      this.userService.getUser(params['id']);
    });
  }

}
