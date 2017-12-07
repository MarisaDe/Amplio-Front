import {Injectable, OnInit} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {UserService} from '../user/user.service';
import {User} from '../../models/user';

@Injectable()
export class GuardService implements CanActivate, OnInit {

  private currentUser: User;

  constructor(private router: Router, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.currentUser) {
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { prevUrl: state.url }});
    return false;
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }
}

