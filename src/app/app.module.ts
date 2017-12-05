import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {UserService} from './services/user.service';
import {TopNavComponent} from './navbars/top-nav.component';
import {RoutingModule} from './app.routing';
import {LeftNavComponent} from './navbars/left-nav.component';
import {RightNavComponent} from './navbars/right-nav.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {AudioNavComponent} from './navbars/audio-nav.component';
import {PlaylistComponent} from './playlist/playlist.component';
import {PlaylistService} from './services/playlist.service';
import {SearchService} from './services/search.service';
import {PersonComponent} from './person/person.component';
import {AlertService} from './services/alert.service';
import {AlertComponent} from './alert/alert.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopNavComponent,
    LeftNavComponent,
    RightNavComponent,
    HomeComponent,
    RegisterComponent,
    AudioNavComponent,
    PlaylistComponent,
    PersonComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RoutingModule
  ],
  providers: [
    UserService,
    PlaylistService,
    SearchService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
