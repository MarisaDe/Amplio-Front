import { Injectable } from '@angular/core';
import 'howler';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Song} from "../../models/song";

@Injectable()
export class AudioService {

  private queueSource = new BehaviorSubject<Array<Song>>([]);
  public songQueue = this.queueSource.asObservable();

  constructor() { }

  setQueue(songs: Array<Song>) {
    this.queueSource.next(songs);
  }

}
