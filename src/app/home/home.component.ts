import { Component } from '@angular/core';
import { User} from "../models/user";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['../main.css']
})
export class HomeComponent {
  currentUser: User;
}
