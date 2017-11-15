import {Component, Input} from '@angular/core';
import {User} from "../models/user";

@Component({
  selector: 'right-nav',
  templateUrl: './right-nav.component.html',
  styleUrls: ['../main.css']
})
export class RightNavComponent {
  @Input() friendList: User[]

}
