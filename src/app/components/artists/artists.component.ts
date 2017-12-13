import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {Playlist} from '../../models/playlist';
import {AdsService} from "../../services/ads/ads.service";
import {ActivatedRoute} from "@angular/router";
import {ArtistService} from "../../services/artist/artist.service";
import {Artist} from "../../models/artist";

@Component({
  selector: 'artists',
  templateUrl: './artists.component.html',
  styleUrls: ['../../main.css', './artists.component.css']
})
export class ArtistsComponent implements OnInit {
  currentUser: User;
  libraryPlaylist: Playlist;
  artist: Artist;

  constructor(private userService: UserService,
              private playlistService: PlaylistService,
              private route: ActivatedRoute,
              private adsService: AdsService,
              private artistService: ArtistService) {

  }
  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
    // this.userService.person.subscribe(person => this.person = person);
    this.route.params.subscribe(params => {
      this.artistService.getArtist(params['id']).subscribe(
        resp => {
          console.log(resp);
          this.artist = new Artist(resp);
          console.log(this.artist);
          // this.loadPlaylists();
          // this.checkFollowing();
        },
        err => {
          console.error(err);
        }
      );
    });
  }
}
