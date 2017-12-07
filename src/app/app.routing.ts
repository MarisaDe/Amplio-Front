import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent} from './home/home.component';
import { RegisterComponent} from './register/register.component';
import { PlaylistComponent } from './playlist/playlist.component';
import {PersonComponent} from './person/person.component';
import {MainLayoutComponent} from './mainlayout/main-layout.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
      {
        path: '',
        component: MainLayoutComponent,
        children: [
          {path: 'home', component: HomeComponent},
          {path: 'playlist', component: PlaylistComponent},
          {path: 'user/:id', component: PersonComponent},
        ]
      },
      { path: 'register', component: RegisterComponent},

    // otherwise redirect to home
      { path: '**', redirectTo: '' }
];

export const RoutingModule = RouterModule.forRoot(appRoutes);
