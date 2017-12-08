import {Component, OnInit} from '@angular/core';
import 'howler';
import {AudioService} from '../../services/audio/audio.service';
import {Song} from "../../models/song";

@Component({
  selector: 'audio-nav',
  templateUrl: './audio-nav.component.html',
  styleUrls: ['./audio-nav.component.css']
})
export class AudioNavComponent implements OnInit {
  playPauseImg = '../../assets/images/audio/play.svg';
  volImg = '../../assets/images/audio/volume.svg';
  repeatImg = '../../assets/images/audio/repeat.svg';
  playing: boolean;
  muted: boolean;
  duration: any;
  loop: boolean;
  shuffle: boolean;
  player: Howl;
  songQueue: Array<Song>;
  songQueueIndex = 0;
  timeLeft = 0;
  progress: number;

  constructor(private audioService: AudioService) {

  }

  getNext() {
    this.player.stop();
    if (this.songQueueIndex === this.songQueue.length - 1) {
      this.songQueueIndex = 0;
      // this.player = this.songQueue[this.songQueueIndex];
    } else {
      this.songQueueIndex += 1;
      // this.player = this.songQueue[this.songQueueIndex];
    }
    this.player.play();
    this.playing = true;
    this.playPauseImg = '../../assets/images/audio/pause.svg';
  }

  getPrev() {
    this.player.stop();
    if (this.shuffle) {
      this.songQueueIndex = Math.random();
    } else if (this.songQueueIndex === 0) {
      this.songQueueIndex = this.songQueue.length - 1;
      // this.player = this.songQueue[this.songQueueIndex];
    } else {
      this.songQueueIndex -= 1;
      // this.player = this.songQueue[this.songQueueIndex];
    }
    this.player.play();
    this.playing = true;
    this.playPauseImg = '../../assets/images/audio/pause.svg';
  }

  togglePlay() {
    if (this.playing) {
      this.player.pause();
      this.playPauseImg = '../../assets/images/audio/play.svg';
    } else {
      this.player.play();
      this.playPauseImg = '../../assets/images/audio/pause.svg';
    }
    this.playing = !this.playing;
  }

  toggleMute() {
    if (this.muted) {
      this.volImg = '../../../assets/images/audio/volume.svg';
    } else {
      this.volImg = '../../../assets/images/audio/mute-on.svg';
    }
    this.player.mute(!this.muted);
    this.muted = !this.muted;
  }

  toggleLoop() {
    if (this.loop) {
      this.repeatImg = '../../assets/images/audio/repeat.svg';
    } else {
      this.repeatImg = '../../../assets/images/audio/repeat-on.svg';
    }
    this.player.loop(!this.loop);
    this.loop = !this.loop;
  }

  toggleShuffle() {
    this.shuffle = !this.shuffle;
  }

  changeVolume(value: number) {
    this.player.volume(value / 100);
  }

  changeSeek(value: number) {
    // this.timeLeft = this.player[this.songQueueIndex].duration() * value;
    // this.player.seek(this.timeLeft);
    // console.log(this.timeLeft);

    // Get the Howl we want to manipulate.
    const sound = this.player[this.songQueueIndex];

    // Convert the percent into a seek position.
    if (sound.playing()) {
      sound.seek(sound.duration() * value);
    }
  }

  step() {
    const sound = this.player[this.songQueueIndex];
    this.progress = Math.round(sound.seek());
    // this.progress = (((seek / song.duration()) * 100) || 0) + '%';
    console.log(this.progress);
    if (this.player.playing()) {
      this.step();
    }
  }

  createHowl(song: Song) {
    const howl = new Howl({
      src: ['../../../assets/' + song.id + '.mp3'],
      onplay: () => {
        this.duration = (Math.round(howl.duration()));
        this.playPauseImg = '../../../assets/images/audio/pause.svg';
        this.step();
      },
      onend: () => {
        this.playPauseImg = '../../../assets/images/audio/play.svg';
      }
    });
    return howl;
  }



  ngOnInit() {

    this.audioService.songQueue.subscribe((songQueue) => {
      this.songQueue = songQueue;
      if (songQueue.length > 0) {
        this.player = this.createHowl(songQueue[this.songQueueIndex]);
        this.playing = false;
        this.togglePlay();
      }
    });
    // this.songQueue = [];
    this.shuffle = false;
    this.playing = false;
    this.muted = false;
    // for (let i = 1; i < 7; i++) {
    //   const song = new Howl({
    //     src: ['../../../assets/audio/' + i + '.wav'],
    //     onplay: () => {
    //       this.duration = (Math.round(song.duration()));
    //       this.playPauseImg = '../../../assets/images/audio/pause.svg';
    //       this.step();
    //     },
    //     onend: () => {
    //       this.playPauseImg = '../../../assets/images/audio/play.svg';
    //     }
    //   });
    //   this.songQueue.push(song);
    // }
    // this.player = this.songQueue;
    console.log(this.songQueue[0]);
  }
}
