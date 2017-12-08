import { Injectable } from '@angular/core';
import 'howler';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AudioService {

  private queueSource = new BehaviorSubject<Array<Howl>>([]);
  public songQueue = this.queueSource.asObservable();

  constructor() { }

  setQueue(songs: Array<Howl>) {
    this.queueSource.next(songs);
  }

}
