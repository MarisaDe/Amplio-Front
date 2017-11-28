import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'right-nav',
  templateUrl: './right-nav.component.html',
  styleUrls: ['./right-nav.component.css', '../main.css']
})
export class RightNavComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }

  // TODO Artist
  loadPersonPage(userId: number) {
    this.userService.getUser(userId);
  }

}
