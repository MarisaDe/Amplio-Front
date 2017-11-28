import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['../main.css', './top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }

  getName(): string {
    let name = null;
    if (this.currentUser != null) {
      name = this.currentUser.name;
    }
    return name;
  }

  getUserPage() {
    this.userService.getUser(this.currentUser.id);
  }
}
