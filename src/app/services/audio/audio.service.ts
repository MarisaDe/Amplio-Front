import { Injectable } from '@angular/core';
import 'howler';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Song} from '../../models/song';
import {Repeat} from "../../common/repeat.enum";
import {HttpClient} from "@angular/common/http";
import {Config} from "../../common/config";

@Injectable()
export class AudioService {

  private unshuffledQueue: Song[];
  private queueSource = new BehaviorSubject<Array<Song>>([]);
  public songQueue = this.queueSource.asObservable();
  private songSource = new BehaviorSubject<Song>(null);
  public currentSong = this.songSource.asObservable();
  private playingSource = new BehaviorSubject<boolean>(false);
  public isPlaying = this.playingSource.asObservable();
  private shuffleSource = new BehaviorSubject<boolean>(false);
  public isShuffled = this.shuffleSource.asObservable();
  private repeatSource = new BehaviorSubject<Repeat>(Repeat.Off);
  public repeatState = this.repeatSource.asObservable();

  private currentIndex = 0;

  constructor(private http: HttpClient) { }

  recordPlay(songId: number) {
    this.http.post(Config.API_URI + 'song/play/' + songId, null,{withCredentials: true}).subscribe();
  }

  setQueue(songs: Array<Song>) {
    this.queueSource.next(songs);
    this.currentIndex = 0;
    this.unshuffledQueue = this.getRemainingQueue();
    if (this.shuffleSource.getValue()) {
      this.shuffle(true);
    }
    this.playingSource.next(true);
    this.songSource.next(null);
    this.songSource.next(songs[0]);
  }

  togglePlay() {
    this.playingSource.next(!this.playingSource.getValue());
  }

  toggleRepeat() {
    switch (this.repeatSource.getValue()) {
      case Repeat.Off: {
        this.repeatSource.next(Repeat.All);
        break;
      }
      case Repeat.All: {
        this.repeatSource.next(Repeat.One);
        break;
      }
      case Repeat.One: {
        this.repeatSource.next(Repeat.Off);
        break;
      }
    }
  }

  // setCurrentSong(song: Song) {
  //   this.songSource.next(song);
  // }
  toggleShuffle() {
    this.shuffleSource.next(!this.shuffleSource.getValue());
    this.shuffle(this.shuffleSource.getValue());
  }

  shuffle(on: boolean) {
    if (on) {
      const queue = this.queueSource.getValue();
      for (let i = queue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [queue[i], queue[j]] = [queue[j], queue[i]];
      }
      this.queueSource.next(queue);
    } else {
      this.queueSource.next([this.songSource.getValue(), ...this.unshuffledQueue]);
    }
  }

  nextSong() {
    const queue: Array<Song> = this.queueSource.getValue();
    let song: Song;
    switch (this.repeatSource.getValue()) {
      case Repeat.Off: {
        if (this.currentIndex === queue.length - 1) {
          song = null;
        } else {
          this.currentIndex++;
          song = queue[this.currentIndex];
        }
        break;
      }
      case Repeat.All: {
        if (this.currentIndex === queue.length - 1) {
          this.currentIndex = 0;
        } else {
          this.currentIndex++;
        }
        song = queue[this.currentIndex];
        break;
      }
      case Repeat.One: {
        song = queue[this.currentIndex];
        break;
      }
    }
    this.songSource.next(song);
  }

  prevSong() {
    const queue: Array<Song> = this.queueSource.getValue();
    let song: Song;
    switch (this.repeatSource.getValue()) {
      case Repeat.Off: {
        if (this.currentIndex === 0) {
          song = null;
        } else {
          this.currentIndex--;
          song = queue[this.currentIndex];
        }
        break;
      }
      case Repeat.All: {
        if (this.currentIndex === 0) {
          this.currentIndex = queue.length - 1;
        } else {
          this.currentIndex--;
        }
        song = queue[this.currentIndex];
        break;
      }
      case Repeat.One: {
        song = queue[this.currentIndex];
        break;
      }
    }
    this.songSource.next(song);
  }

  getRemainingQueue(): Song[] {
    if (this.currentIndex === this.queueSource.getValue().length - 1) {
      return this.queueSource.getValue();
    } else {
      return this.queueSource.getValue().slice(this.currentIndex + 1);
    }
  }

  addToQueue(song: Song) {
    const queue: Array<Song> = this.queueSource.getValue();
    const updateCurrent = queue.length === 0;
    const head: Song = queue.shift();
    queue.unshift(song);
    queue.unshift(head);
    this.queueSource.next(queue);
    if (updateCurrent) {
      this.currentIndex = 0;
      this.songSource.next(queue[this.currentIndex]);
    }
  }

  addSongsToQueue(songs: Song[]) {
    const queue: Array<Song> = this.queueSource.getValue();
    const updateCurrent = queue.length === 0;
    const head: Song = queue.shift();
    for (const song of songs) {
      queue.unshift(song);
    }
    queue.unshift(head);
    console.log(queue);
    this.queueSource.next(queue);
    if (updateCurrent) {
      this.currentIndex = 0;
      this.songSource.next(queue[this.currentIndex]);
    }
  }

  removeFromQueue(songId: number) {
    const queue: Array<Song> = this.queueSource.getValue();
    let index = -1;
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].id === songId) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      queue.splice(index, 1);
      this.queueSource.next(queue);
    }
  }

  resetQueue() {
    this.queueSource.next([]);
    this.currentIndex = 0;
  }
}
