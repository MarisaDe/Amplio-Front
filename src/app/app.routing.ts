import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { TopNavComponent } from "./navbars/top-nav.component";
import { LeftNavComponent } from "./navbars/left-nav.component";
import { RightNavComponent } from "./navbars/right-nav.component";

const appRoutes: Routes = [
    { path: '', component: TopNavComponent,
      children: [
        { path: '', component: LoginComponent }
      ]},

    { path: 'login', component: TopNavComponent,
      children: [
        { path: '', component: LeftNavComponent,
          children: [
            { path: '', component: LoginComponent }
          ],
        }
      ]},

  { path: 'home', component: TopNavComponent,
    children: [
      { path: '', component: LeftNavComponent,
        children: [
          { path: '', component: RightNavComponent },
          { path: '',  component: LoginComponent }
        ],
      }
    ]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
