import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['../main.css', './home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService) {

  }

  // changeName() {
  //   this.currentUser.setFirstName('hi');
  // }

  ngOnInit() {
    console.log('hello from home component!');
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }
}
