import { Injectable } from '@angular/core';
import 'howler';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Song} from "../../models/song";

@Injectable()
export class AudioService {

  private queueSource = new BehaviorSubject<Array<Song>>([]);
  public songQueue = this.queueSource.asObservable();
  private songSource = new BehaviorSubject<Song>(null);
  public currentSong = this.songSource.asObservable();

  private currentIndex = 0;

  constructor() { }

  setQueue(songs: Array<Song>) {
    this.queueSource.next(songs);
    this.currentIndex = 0;
    this.songSource.next(null);
    this.songSource.next(songs[0]);
  }

  // setCurrentSong(song: Song) {
  //   this.songSource.next(song);
  // }

  nextSong() {
    const queue: Array<Song> = this.queueSource.getValue();
    if (this.currentIndex === queue.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
    this.songSource.next(queue[this.currentIndex]);
  }

  prevSong() {
    const queue: Array<Song> = this.queueSource.getValue();
    if (this.currentIndex === 0) {
      this.currentIndex = queue.length - 1;
    } else {
      this.currentIndex--;
    }
    this.songSource.next(queue[this.currentIndex]);
  }
}
