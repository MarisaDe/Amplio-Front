import {Component, OnInit, Type} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {Playlist} from '../../models/playlist';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AudioService} from '../../services/audio/audio.service';
import {Config} from '../../common/config';
import {isType} from '@angular/core/src/type';
import {ArtistService} from "../../services/artist/artist.service";
import {Artist} from "../../models/artist";

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css', '../../main.css']
})
export class SearchComponent implements OnInit {
  currentUser: User;
  query: string;
  userResults: User[] = [];
  artistResults: Artist[] = [];
  playlistResults: Playlist[] = [];
  response: any;
  resultNum = 0;

  constructor(private userService: UserService,
              private playlistService: PlaylistService,
              private audioService: AudioService,
              private route: ActivatedRoute,
              private router: Router,
              private artistService: ArtistService) {
  }

  getUserSearchResults() {
    this.userService.search(this.query).subscribe(
      resp => {
        console.log(resp);
        this.response = resp;
        this.userResults = [];
        for (const result of this.response) {
          const resultElement = new User(result);
          console.log(result);
          this.userResults.push(resultElement);
          console.log(this.userResults);
          this.resultNum += 1;
        }
      });
  }

  getArtistSearchResults() {
    this.artistService.search(this.query).subscribe(
      resp => {
        console.log(resp);
        this.response = resp;
        this.artistResults = [];
        for (const result of this.response) {
          const resultElement = new Artist(result);
          this.artistResults.push(resultElement);
          this.resultNum += 1;
        }
      });
  }

  getPlaylistSearchResults() {
    this.playlistService.search(this.query).subscribe(
      resp => {
        console.log(resp);
        this.response = resp;
        this.playlistResults = [];
        for (const result of this.response) {
          const resultElement = new Playlist(result);
          this.playlistResults.push(resultElement);
          this.resultNum += 1;
        }
      });
  }
  // isUser(val: any) {
  //   if (val instanceof User) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.query = params['id'];
      this.getUserSearchResults();
      this.getArtistSearchResults();
      this.getPlaylistSearchResults();
    });
  }
}
