import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent} from './home/home.component';
import { RegisterComponent} from './register/register.component';
import { PlaylistComponent } from './playlist/playlist.component';

const appRoutes: Routes = [
      { path: '', component: LoginComponent },
      { path: 'home', component: HomeComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'playlist', component: PlaylistComponent},

    // otherwise redirect to home
      { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
