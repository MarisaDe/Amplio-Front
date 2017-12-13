import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {ActivatedRoute} from '@angular/router';
import {AudioService} from "../../services/audio/audio.service";
import {Song} from "../../models/song";

@Component({
  selector: 'lyrics',
  templateUrl: './lyrics.component.html',
  styleUrls: ['./lyrics.component.css', '../../main.css']
})
export class LyricsComponent implements OnInit {
  currentUser: User;
  song: Song;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private audioService: AudioService) {
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
    this.audioService.currentSong.subscribe(song => this.song = song);
  }

}
