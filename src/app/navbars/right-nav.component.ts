import {Component, Input} from '@angular/core';
import {User} from "../models/user";

@Component({
  selector: 'right-nav',
  templateUrl: './right-nav.component.html',
  styleUrls: ['./right-nav.component.css', '../main.css']
})
export class RightNavComponent {
  @Input() friendList: User[];

}
