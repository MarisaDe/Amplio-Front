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
import {HomeComponent} from './components/home/home.component';
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
import {Ng2PageTransitionModule} from 'ng2-page-transition';
import {SongqueueComponent} from './components/songqueue/songqueue.component';
import {ArtistComponent} from './components/artist/artist.component';
import {AdminloginComponent} from './components/adminlogin/adminlogin.component';
import {LibraryComponent} from "./components/library/library.component";
import {ArtistsComponent} from "./components/artists/artists.component";
import {AlbumsComponent} from "./components/albums/albums.component";
import {LyricsComponent} from "./components/lyrics/lyrics.component";
import {AdsService} from "./services/ads/ads.service";
import {AdComponent} from "./components/ad/ad.component";
import {AlbumComponent} from "./components/album/album.component";
import {AlbumService} from "./services/album/album.service";
import {SongService} from "./services/song/song.service";
import {SearchComponent} from "./components/search/search.component";
import {ArtistService} from "./services/artist/artist.service";
import {HistoryComponent} from "./components/history/history.component";
import {AdminHomeComponent} from "./components/admin/home.component";
import {AdminLayoutComponent} from "./components/adminlayout/adminlayout.component";
import {AdminNavComponent} from "./components/adminnav/admin-nav.component";


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
    SongqueueComponent,
    ArtistComponent,
    AdminloginComponent,
    LibraryComponent,
    ArtistsComponent,
    AlbumsComponent,
    LyricsComponent,
    AdComponent,
    AlbumComponent,
    SearchComponent,
    HistoryComponent,
    AdminHomeComponent,
    AdminLayoutComponent,
    AdminNavComponent
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
    AudioService,
    AdsService,
    AlbumService,
    SongService,
    ArtistService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
