import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user';

@Component({
  selector: 'audio-nav',
  templateUrl: './audio-nav.component.html',
  styleUrls: ['./audio-nav.component.css']
})
export class AudioNavComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }
}
