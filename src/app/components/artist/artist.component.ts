import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css', '../../main.css']
})
export class ArtistComponent implements OnInit {
  currentUser: User;
  person: User; // TODO Artist

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
    this.userService.person.subscribe(person => this.person = person);
  }

}
