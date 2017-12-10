import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {UserService} from './services/user/user.service';
import {TopNavComponent} from './components/navbars/top-nav.component';
import {RoutingModule} from './app.routing';
import {LeftNavComponent} from './components/navbars/left-nav.component';
import {RightNavComponent} from './components/navbars/right-nav.component';
import {HomeComponent, PairsPipe} from './components/home/home.component';
import {RegisterComponent} from './components/register/register.component';
import {AudioNavComponent} from './components/navbars/audio-nav.component';
import {PlaylistComponent} from './components/playlist/playlist.component';
import {PlaylistService} from './services/playlist/playlist.service';
import {SearchService} from './services/search/search.service';
import {PersonComponent} from './components/person/person.component';
import {AlertService} from './services/alert/alert.service';
import {AlertComponent} from './components/alert/alert.component';
import {AuthService} from './services/auth/auth.service';
import {MainLayoutComponent} from './components/mainlayout/main-layout.component';
import {GuardService} from './services/auth/guard.service';
import {AudioService} from './services/audio/audio.service';
import {Ng2PageTransitionModule} from "ng2-page-transition";


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
    AlertComponent,
    MainLayoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RoutingModule,
    Ng2PageTransitionModule,
  ],
  providers: [
    UserService,
    PlaylistService,
    SearchService,
    AlertService,
    AuthService,
    GuardService,
    AudioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
