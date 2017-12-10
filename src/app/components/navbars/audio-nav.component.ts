import {Component, OnInit} from '@angular/core';
import {AudioService} from '../../services/audio/audio.service';
import {Song} from '../../models/song';
import {Repeat} from '../../common/repeat.enum';
import {Config} from '../../common/config';
import {Album} from "../../models/album";
import {Artist} from "../../models/artist";

@Component({
  selector: 'audio-nav',
  templateUrl: './audio-nav.component.html',
  styleUrls: ['./audio-nav.component.css']
})
export class AudioNavComponent implements OnInit {
  private viewConfig = new Config();
  private songQueue: Array<Song>;
  private song: Song;
  private playing: boolean;
  private shuffle: boolean;
  private mute: boolean;
  private currentTime: number;
  private progress: number;
  private repeatState: Repeat;
  private playPauseImg: string;
  private repeatImg: string;
  private volImg: string;

  constructor(private audioService: AudioService) {
    this.audioService.songQueue.subscribe(songQueue => this.songQueue = songQueue);
  }


  ngOnInit() {
    this.song =  new Song({
      songId: 1,
      duration: 180,
      album: new Album({
        albumId: 1,
        title: 'Curtain Call',
        date: '06-06-2006',
        image: 'key.jpg',
        artist: new Artist({
          id: 1,
          name: 'Eminem',
          bibliography: 'G.O.A.T'
        }),
      }),
      lyrics: 'It\'s like I\'m in the dirt...',
      numPlays: 1,
      songName: 'Lose Yourself',
      artists: []
    });
    this.song.media.addEventListener('timeupdate', () => {
      this.currentTime = this.song.media.currentTime;
      this.progress = (this.currentTime / this.song.media.duration) * Config.PLAYER_GRANULARITY;
    });
    this.song.media.addEventListener('ended', () => {
      this.playPauseImg = '../../assets/images/audio/play.svg';
    });
  }

  songSeek(value: number) {
    console.log(value);
    this.song.media.currentTime = (value / Config.PLAYER_GRANULARITY) * this.song.media.duration;
  }

  toggleShuffle() {
    this.shuffle = !this.shuffle;
  }

  toggleRepeat() {
    switch (this.repeatState) {
      case Repeat.Off: {
        this.repeatImg = Config.REPEAT_OFF_IMAGE;
        this.repeatState = Repeat.All;
        break;
      }
      case Repeat.All: {
        this.repeatImg = Config.REPEAT_ALL_IMAGE;
        this.repeatState = Repeat.One;
        break;
      }
      case Repeat.One: {
        this.repeatImg = Config.REPEAT_ONE_IMAGE;
        this.repeatState = Repeat.Off;
        break;
      }
    }
  }

  toggleMute() {
    if (this.mute) {
      this.volImg = Config.MUTE_IMAGE;
    } else {
      this.volImg = Config.VOLUME_IMAGE;
    }
    this.mute = !this.mute;
  }

  togglePlay() {
    if (this.playing) {
      this.song.media.pause();
      this.playPauseImg = Config.PLAY_IMAGE;
    } else {
      this.song.media.play();
      this.playPauseImg = Config.PAUSE_IMAGE;
    }
    this.playing = !this.playing;
  }

  getMinSec(value: number): string {
    console.log(value);
    const min = Math.floor(value / 60);
    const sec = Math.round(value % 60);
    let minstr = String(min);
    let secstr = String(sec);
    if (min < 10) {
      minstr = '0' + minstr;
    }
    if (sec < 10) {
      secstr = '0' + secstr;
    }
    return minstr + ':' + secstr;
  }

  changeVolume(value: number) {
    this.song.media.volume = value / 100;
  }

  nextSong() {
    console.log('TODO: next song');
  }

  prevSong() {
    console.log('TODO: prev song');
  }
  // playPauseImg = '../../assets/images/audio/play.svg';
  // volImg = '../../assets/images/audio/volume.svg';
  // repeatImg = '../../assets/images/audio/repeat.svg';
  // playing: boolean;
  // muted: boolean;
  // duration: any;
  // loop: boolean;
  // shuffle: boolean;
  // player: Howl;
  // songQueue: Array<Howl>;
  // songQueueIndex = 0;
  // timeLeft = 0;
  // progress: number;
  //
  // constructor(private audioService: AudioService) {
  //
  // }
  //
  // getNext() {
  //   this.player.stop();
  //   if (this.songQueueIndex === this.songQueue.length - 1) {
  //     this.songQueueIndex = 0;
  //     this.player = this.songQueue[this.songQueueIndex];
  //   } else {
  //     this.songQueueIndex += 1;
  //     this.player = this.songQueue[this.songQueueIndex];
  //   }
  //   this.player.play();
  //   this.playing = true;
  //   this.playPauseImg = '../../assets/images/audio/pause.svg';
  // }
  //
  // getPrev() {
  //   this.player.stop();
  //   if (this.shuffle) {
  //     this.songQueueIndex = Math.random();
  //   } else if (this.songQueueIndex === 0) {
  //     this.songQueueIndex = this.songQueue.length - 1;
  //     this.player = this.songQueue[this.songQueueIndex];
  //   } else {
  //     this.songQueueIndex -= 1;
  //     this.player = this.songQueue[this.songQueueIndex];
  //   }
  //   this.player.play();
  //   this.playing = true;
  //   this.playPauseImg = '../../assets/images/audio/pause.svg';
  // }
  //
  // togglePlay() {
  //   if (this.playing) {
  //     this.player.pause();
  //     this.playPauseImg = '../../assets/images/audio/play.svg';
  //   } else {
  //     this.player.play();
  //     this.playPauseImg = '../../assets/images/audio/pause.svg';
  //   }
  //   this.playing = !this.playing;
  // }
  //
  // toggleMute() {
  //   if (this.muted) {
  //     this.volImg = '../../../assets/images/audio/volume.svg';
  //   } else {
  //     this.volImg = '../../../assets/images/audio/mute-on.svg';
  //   }
  //   this.player.mute(!this.muted);
  //   this.muted = !this.muted;
  // }
  //
  // toggleLoop() {
  //   if (this.loop) {
  //     this.repeatImg = '../../assets/images/audio/repeat.svg';
  //   } else {
  //     this.repeatImg = '../../../assets/images/audio/repeat-on.svg';
  //   }
  //   this.player.loop(!this.loop);
  //   this.loop = !this.loop;
  // }
  //
  // toggleShuffle() {
  //   this.shuffle = !this.shuffle;
  // }
  //
  // changeVolume(value: number) {
  //   this.player.volume(value / 100);
  // }
  //
  // changeSeek(value: number) {
  //   // this.timeLeft = this.player[this.songQueueIndex].duration() * value;
  //   // this.player.seek(this.timeLeft);
  //   // console.log(this.timeLeft);
  //
  //   // Get the Howl we want to manipulate.
  //   const sound = this.player[this.songQueueIndex];
  //
  //   // Convert the percent into a seek position.
  //   if (sound.playing()) {
  //     sound.seek(sound.duration() * value);
  //   }
  // }
  //
  // step() {
  //   const sound = this.player[this.songQueueIndex];
  //   this.progress = Math.round(sound.seek());
  //   // this.progress = (((seek / song.duration()) * 100) || 0) + '%';
  //   console.log(this.progress);
  //   if (this.player.playing()) {
  //     this.step();
  //   }
  // }
  //
  // ngOnInit() {
  //
  //   // this.audioService.songQueue.subscribe(songQueue => this.songQueue = songQueue);
  //   this.songQueue = [];
  //   this.shuffle = false;
  //   this.playing = false;
  //   this.muted = false;
  //   for (let i = 1; i < 7; i++) {
  //     const song = new Howl({
  //       src: ['../../../assets/audio/' + i + '.wav'],
  //       onplay: () => {
  //         this.duration = (Math.round(song.duration()));
  //         this.playPauseImg = '../../../assets/images/audio/pause.svg';
  //         this.step();
  //
  //       },
  //       onend: () => {
  //         this.playPauseImg = '../../../assets/images/audio/play.svg';
  //       },
  //     });
  //     this.songQueue.push(song);
  //   }
  //   this.player = this.songQueue[0];
  //   console.log(this.songQueue[0]);
  // }
}
