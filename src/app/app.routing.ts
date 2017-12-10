import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {RegisterComponent} from './components/register/register.component';
import {PlaylistComponent} from './components/playlist/playlist.component';
import {PersonComponent} from './components/person/person.component';
import {MainLayoutComponent} from './components/mainlayout/main-layout.component';
import {GuardService} from './services/auth/guard.service';
import {SongqueueComponent} from "./components/songqueue/songqueue.component";

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [GuardService],
    children: [
      {
        path: '',
        canActivateChild: [GuardService],
        children: [
          {path: 'home', component: HomeComponent},
          {path: 'playlist/:id', component: PlaylistComponent},
          {path: 'user/:id', component: PersonComponent},
          {path: 'queue', component: SongqueueComponent}
        ]
      }
    ]
  },
  // otherwise redirect to home
  {path: '**', redirectTo: 'home'}
];

export const RoutingModule = RouterModule.forRoot(appRoutes);
