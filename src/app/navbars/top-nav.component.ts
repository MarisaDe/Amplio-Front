import {Component, OnInit} from '@angular/core';
import {User} from "../models/user";

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['../main.css']
})
export class TopNavComponent implements OnInit {
  currentUser: User;

  constructor(){
  }

  ngOnInit() {
    console.log('hello from top component!');
  }
}
