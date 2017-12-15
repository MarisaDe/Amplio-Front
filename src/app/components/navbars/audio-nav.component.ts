import {Component, OnInit} from '@angular/core';
import {AudioService} from '../../services/audio/audio.service';
import {Song} from '../../models/song';
import {Repeat} from '../../common/repeat.enum';
import {Config} from '../../common/config';
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'audio-nav',
  templateUrl: './audio-nav.component.html',
  styleUrls: ['./audio-nav.component.css']
})
export class AudioNavComponent implements OnInit {
  private currentUser: User;
  private song: Song;
  private playing = false;
  private mute = false;
  private currentTime: number;
  private progress = 0;
  private progressMinSec = '';
  private playPauseImg = Config.PLAY_IMAGE;
  private repeatImg = Config.REPEAT_OFF_IMAGE;
  private volImg = Config.VOLUME_IMAGE;
  private shuffleImg = Config.SHUFFLE_OFF_IMAGE;
  private lyricsImg = Config.LYRICS_OFF_IMAGE;
  private readonly nextImg = Config.NEXT_IMAGE;
  private readonly prevImg = Config.PREVIOUS_IMAGE;
  private readonly queueImg = Config.QUEUE_IMAGE;

  constructor(private audioService: AudioService, private userService: UserService) { }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user );
    this.audioService.isPlaying.subscribe(playing => this.playing = playing );
    this.audioService.isShuffled.subscribe(shuffle => {
      if (shuffle) {
        this.shuffleImg = Config.SHUFFLE_ON_IMAGE;
      } else {
        this.shuffleImg = Config.SHUFFLE_OFF_IMAGE;
      }
    });
    this.audioService.repeatState.subscribe(repeatState => {
      switch (repeatState) {
        case Repeat.Off: {
          this.repeatImg = Config.REPEAT_OFF_IMAGE;
          break;
        }
        case Repeat.All: {
          this.repeatImg = Config.REPEAT_ALL_IMAGE;
          break;
        }
        case Repeat.One: {
          this.repeatImg = Config.REPEAT_ONE_IMAGE;
          break;
        }
      }
    });
    // this.audioService.songQueue.subscribe(songQueue => this.songQueue = songQueue);
    this.audioService.currentSong.subscribe(song => {
      console.log(song);
      if (song) {
        if (this.song) {
          this.song.resetMedia();
          // console.log(this.song.media);
        }
        this.song = song;
        // this.song.resetMedia();
        this.song.media.addEventListener('timeupdate', () => {
          // console.log(this.song.media.id);
          this.currentTime = this.song.media.currentTime;
          if (song.media.duration) {
            this.progress = (song.media.currentTime / song.media.duration) * Config.PLAYER_GRANULARITY;
            this.progressMinSec = this.getMinSec(song.media.currentTime) + '/' + this.getMinSec(song.media.duration);
          } else {
            this.progress = 0;
            this.progressMinSec = '--:--/--:--';
          }
        });
        this.song.media.addEventListener('ended', () => {
          this.nextSong();
        });
        if (this.playing) {
          this.song.media.play();
          this.playPauseImg = Config.PAUSE_IMAGE;
        }
        this.currentUser.history.push(this.song);
        this.audioService.recordPlay(this.song.id);
      }
    });
  }

  songSeek(value: number) {
    // console.log(value);
    this.song.media.currentTime = (value / Config.PLAYER_GRANULARITY) * this.song.media.duration;
  }

  toggleShuffle() {
    this.audioService.toggleShuffle();
  }

  toggleRepeat() {
    this.audioService.toggleRepeat();
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
    if (!this.song) {
      return;
    }
    if (this.playing) {
      this.song.media.pause();
      this.playPauseImg = Config.PLAY_IMAGE;
    } else {
      this.song.media.play();
      this.playPauseImg = Config.PAUSE_IMAGE;
    }
    this.audioService.togglePlay();
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

  nextSong() {
    this.song.media.pause();
    this.audioService.nextSong();
    // console.log('TODO: next song');
  }

  prevSong() {
    this.song.media.pause();
    this.audioService.prevSong();
    // console.log('TODO: prev song');
  }
}
