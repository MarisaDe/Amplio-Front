import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/user';
import {Config} from "../../common/config";

@Component({
  selector: 'left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css', '../../main.css']
})
export class LeftNavComponent implements OnInit {
  currentUser: User;
  playlistImg = Config.ALBUM_DEFAULT_IMAGE;

  constructor(private userService: UserService) {
  }

  updatePic(fileInput: any) {
      console.log('CHANGING IMAGE');
      this.playlistImg = fileInput.target.files[0];

      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.playlistImg = e.target.result;
      }

      reader.readAsDataURL(fileInput.target.files[0]);
      console.log(this.playlistImg);
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
    console.log(this.playlistImg);
  }
}
