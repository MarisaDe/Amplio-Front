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
  playPauseImg = '../../assets/images/audio/play.svg';
  volImg = '../../assets/images/audio/volume.svg';
  repeatImg = '../../assets/images/audio/repeat.svg';
  playing: boolean;
  muted: boolean;
  duration: number;
  loop: boolean;
  songExample = Song;

  constructor(private userService: UserService) {
    this.playing = false;
    this.muted = false;
    this.player = new Howl({
        src: ['../../assets/sample.mp3']
    });
    this.duration = this.player.duration();
    console.log(this.player.duration);
  }

  togglePlay() {
    if (this.playing !== false) {
      this.player.pause();
      this.playing = false;
      this.playPauseImg = '../../assets/images/audio/pause.svg';
    } else {
      this.player.play();
      this.playing = true;
      this.playPauseImg = '../../assets/images/audio/play.svg';
    }
  }
  toggleMute() {
    if (this.muted === false) {
      this.player.mute(true);
      this.muted = true;
      this.volImg = '../../assets/images/audio/mute-on.svg';
    } else {
      this.player.mute(false);
      this.muted = false;
      this.volImg = '../../assets/images/audio/volume.svg';
      }
    }
  toggleLoop() {
    if (this.loop === false) {
      this.player.loop(true);
      this.loop = true;
      this.repeatImg = '../../assets/images/audio/repeat-on.svg';
    } else {
      this.player.loop(false);
      this.loop = false;
      this.repeatImg = '../../assets/images/audio/repeat.svg';
    }
  }

  changeVolume(value: number) {
    this.player.volume(value / 100);
  }

  changePos(value: number) {
    if (this.player.playing()) {
      this.player.seek(this.player.duration() * value);
    }
  }
  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }
}
