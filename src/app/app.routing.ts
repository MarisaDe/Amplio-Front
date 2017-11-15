import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { TopNavComponent } from "./navbars/top-nav.component";
import { LeftNavComponent } from "./navbars/left-nav.component";
import { RightNavComponent } from "./navbars/right-nav.component";
import { HomeComponent} from "./home/home.component";

const appRoutes: Routes = [
      { path: '', component: LoginComponent },
      { path: 'home', component: HomeComponent},

    // otherwise redirect to home
      { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
