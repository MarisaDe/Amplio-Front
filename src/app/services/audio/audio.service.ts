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

}
