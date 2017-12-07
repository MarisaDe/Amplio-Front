import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/user';
import 'howler';
import {Song} from '../../models/song';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'audio-nav',
  templateUrl: './audio-nav.component.html',
  styleUrls: ['./audio-nav.component.css']
})
export class AudioNavComponent implements OnInit {
  currentUser: User;
  playPauseImg = '../../assets/images/audio/play.svg';
  volImg = '../../assets/images/audio/volume.svg';
  repeatImg = '../../assets/images/audio/repeat.svg';
  playing: boolean;
  muted: boolean;
  duration: any;
  loop: boolean;
  shuffle: boolean;
  player: Howl;
  playlist= new Array<Howl>();
  playlistIndex = 0;
  timeLeft = 0;
  progress: number;

  constructor(private userService: UserService, private route: ActivatedRoute) {

  }


  getNext() {
    this.player.stop();
    if (this.playlistIndex === this.playlist.length - 1) {
      this.playlistIndex = 0;
      this.player = this.playlist[this.playlistIndex];
    } else {
      this.playlistIndex += 1;
      this.player = this.playlist[this.playlistIndex];
    }
    this.player.play();
    this.playing = true;
    this.playPauseImg = '../../assets/images/audio/pause.svg';
  }

  getPrev() {
    this.player.stop();
    if (this.shuffle) {
      this.playlistIndex = Math.random();
    } else if (this.playlistIndex === 0) {
      this.playlistIndex = this.playlist.length - 1;
      this.player = this.playlist[this.playlistIndex];
    } else {
      this.playlistIndex -= 1;
      this.player = this.playlist[this.playlistIndex];
    }
    this.player.play();
    this.playing = true;
    this.playPauseImg = '../../assets/images/audio/pause.svg';
  }
  togglePlay() {
    if (this.playing !== false) {
      this.player.pause();
      this.playing = false;
      this.playPauseImg = '../../assets/images/audio/play.svg';
    } else {
      this.player.play();
      this.playing = true;
      this.playPauseImg = '../../assets/images/audio/pause.svg';
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

  toggleShuffle() {
    if (this.shuffle === false) {
      this.shuffle = true;
    } else {
      this.shuffle = false;
    }
  }
  changeVolume(value: number) {
    this.player.volume(value / 100);
  }

  changeSeek(value: number) {
      // this.timeLeft = this.player[this.playlistIndex].duration() * value;
      // this.player.seek(this.timeLeft);
      // console.log(this.timeLeft);

      // Get the Howl we want to manipulate.
      const sound = this.player[this.playlistIndex];

      // Convert the percent into a seek position.
      if (sound.playing()) {
        sound.seek(sound.duration() * value);
    }
  }
  step() {
      const sound = this.player[this.playlistIndex];
      this.progress = Math.round(sound.seek());
      // this.progress = (((seek / song.duration()) * 100) || 0) + '%';
      console.log(this.progress);
      if (this.player.playing()) {
        this.step();
    }
  }
  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
    this.shuffle = false;
    this.playing = false;
    this.muted = false;
    for (let i = 1; i < 7; i++) {
      const song = new Howl({
        src: ['../../assets/audio/' + i + '.wav'],
        onplay: () => {
          this.duration = (Math.round(song.duration()));
          this.playPauseImg = '../../assets/images/audio/pause.svg';
          this.step();
        },
        onend: () => {
          this.playPauseImg = '../../assets/images/audio/play.svg';
        },
      });
      this.playlist.push(song);
    }
    this.player = this.playlist[0];
    console.log(this.playlist[0]);
    // this.duration = Math.round(this.playlist[0].duration());
  }
}
