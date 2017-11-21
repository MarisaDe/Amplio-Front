import {Component, Input} from '@angular/core';
import {User} from "../models/user";

@Component({
  selector: 'playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css', '../main.css']
})
export class PlaylistComponent {
  @Input() friendList: User[];

}
