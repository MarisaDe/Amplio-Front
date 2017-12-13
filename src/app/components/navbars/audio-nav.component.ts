import {Component, OnInit} from '@angular/core';
import {AudioService} from '../../services/audio/audio.service';
import {Song} from '../../models/song';
import {Repeat} from '../../common/repeat.enum';
import {Config} from '../../common/config';

@Component({
  selector: 'audio-nav',
  templateUrl: './audio-nav.component.html',
  styleUrls: ['./audio-nav.component.css']
})
export class AudioNavComponent implements OnInit {
  // private songQueue: Array<Song>;
  private song: Song;
  private playing: boolean;
  private shuffle: boolean;
  private mute: boolean;
  private currentTime: number;
  private progress = 0;
  private repeatState: Repeat;
  private playPauseImg = Config.PLAY_IMAGE;
  private repeatImg = Config.REPEAT_OFF_IMAGE;
  private volImg = Config.VOLUME_IMAGE;
  private shuffleImg = Config.SHUFFLE_OFF_IMAGE;
  private lyricsImg = Config.LYRICS_OFF_IMAGE;
  private readonly nextImg = Config.NEXT_IMAGE;
  private readonly prevImg = Config.PREVIOUS_IMAGE;
  private readonly queueImg = Config.QUEUE_IMAGE;

  constructor(private audioService: AudioService) {
  }

  ngOnInit() {
    // this.audioService.songQueue.subscribe(songQueue => this.songQueue = songQueue);
    this.audioService.currentSong.subscribe(song => this.song = song);
    // this.song = new Song({
    //   id: 1,
    //   duration: 180,
    //   album: {
    //     id: 1,
    //     title: 'Curtain Call',
    //     date: '06-06-2006',
    //     image: Config.ALBUM_DEFAULT_IMAGE,
    //     artist: {
    //       id: 1,
    //       name: 'Eminem',
    //       bibliography: 'G.O.A.T'
    //     },
    //   },
    //   lyrics: 'It\'s like I\'m in the dirt...',
    //   numPlays: 1,
    //   songName: 'Lose Yourself',
    //   artist: {
    //     id: 1,
    //     name: 'Eminem',
    //     bibliography: 'G.O.A.T'
    //   }
    // });
    this.updateSong();
    this.shuffle = false;
    console.log(this.song);
  }

  songSeek(value: number) {
    // console.log(value);
    this.song.media.currentTime = (value / Config.PLAYER_GRANULARITY) * this.song.media.duration;
  }

  toggleShuffle() {
    if (this.shuffle) {
      this.shuffleImg = Config.SHUFFLE_ON_IMAGE;
    } else {
      this.shuffleImg = Config.SHUFFLE_OFF_IMAGE;
    }
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

  toggleMute(value: number) {
    if (this.mute) {
      this.volImg = Config.MUTE_IMAGE;
      this.song.media.volume = 0;
    } else {
      this.volImg = Config.VOLUME_IMAGE;
      this.song.media.volume = value / 100;
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
    if (!this.mute) {
      this.song.media.volume = value / 100;
    }
  }

  updateSong() {
    this.song.media = <HTMLAudioElement>this.song.media.cloneNode(true);
    this.song.media.addEventListener('timeupdate', () => {
      this.currentTime = this.song.media.currentTime;
      this.progress = (this.currentTime / this.song.media.duration) * Config.PLAYER_GRANULARITY;
    });
    this.song.media.addEventListener('ended', () => {
      switch (this.repeatState) {
        case Repeat.Off:
          this.playPauseImg = Config.PLAY_IMAGE;
          break;
        case Repeat.All:
          this.nextSong();
          break;
        case Repeat.One:
          this.song.media.play();
          break;
      }
    });
    if (this.playing) {
      this.song.media.play();
    }
  }

  nextSong() {
    this.song.media.pause();
    this.audioService.nextSong();
    this.updateSong();
    // console.log('TODO: next song');
  }

  prevSong() {
    this.song.media.pause();
    this.audioService.prevSong();
    this.updateSong();
    // console.log('TODO: prev song');
  }
}
