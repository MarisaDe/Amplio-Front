import { Injectable } from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AlertService {
  // Subject is used here because message doesn't have an initial value. It is updated based on events.
  private alert: Subject<any>;
  private keep: boolean;

  constructor(private router: Router) {
    this.alert = new Subject();
    this.keep = false;

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keep) {
          this.keep = false;
        } else {
          this.clearMessage();
        }
      }
    });
  }

  clearMessage() {
    this.alert.next();
  }

  // This is how you do optional variables in TS
  success(message: string, keep: boolean = false) {
    this.keep = keep;
    this.alert.next({type: 'success', message: message});
  }

  error(message: string, keep: boolean = false) {
    this.keep = keep;
    this.alert.next({type: 'error', message: message});
  }

  getAlert(): Observable<any> {
    return this.alert.asObservable();
  }

}
