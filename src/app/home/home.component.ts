import {Component, OnInit} from '@angular/core';
import { User} from "../models/user";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['../main.css', './home.component.css']
})
export class HomeComponent implements OnInit{
  currentUser: User;

  constructor(){

  }

  ngOnInit() {
    console.log('hello from home component!');
  }
}
