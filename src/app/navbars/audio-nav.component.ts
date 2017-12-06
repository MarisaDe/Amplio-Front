import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import 'howler';
import {Song} from '../models/song';

@Component({
  selector: 'audio-nav',
  templateUrl: './audio-nav.component.html',
  styleUrls: ['./audio-nav.component.css']
})
export class AudioNavComponent implements OnInit {
  currentUser: User;
  player: Howl;
  playPauseButton: string;
  playing: boolean;
  muted: boolean;
  duration: any;
  loop: boolean;
  songExample = Song;

  constructor(private userService: UserService) {
    this.playPauseButton = '../../assets/images/audio/play.svg';
    this.playing = false;
    this.muted = false;
    this.player = new Howl({
        src: ['../../assets/sample.mp3']
    });
    this.duration = (Math.round(this.player.duration()));
    console.log(this.duration);
  }

  togglePlay() {
    if (this.playing !== false) {
      this.player.pause();
      this.playing = false;
    } else {
      this.player.play();
      this.playing = true;
    }
  }
  toggleMute() {
    if (this.muted === false) {
      this.player.mute(true);
      this.muted = true;
    } else {
      this.player.mute(false);
      this.muted = false;
      }
    }
  toggleLoop() {
    if (this.muted === false) {
      this.player.loop(true);
      this.loop = true;
    } else {
      this.player.loop(false);
      this.loop = false;
    }
  }
  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }
}
