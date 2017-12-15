import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {ArtistService} from "../../services/artist/artist.service";
import {PlaylistService} from "../../services/playlist/playlist.service";
import {AdsService} from "../../services/ads/ads.service";
import {Artist} from "../../models/artist";
import {ActivatedRoute} from '@angular/router';
import {AlbumService} from "../../services/album/album.service";
import {Album} from "../../models/album";

@Component({
  selector: 'artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css', '../../main.css']
})
export class ArtistComponent implements OnInit {
  currentUser: User;
  artist: Artist;
  albums: Album[];
  isFollowing = false;
  relatedArtists: Artist[];

  constructor(private userService: UserService,
              private playlistService: PlaylistService,
              private route: ActivatedRoute,
              private adsService: AdsService,
              private artistService: ArtistService,
              private albumService: AlbumService) {

  }

  toggleFollow() {
    if (!this.isFollowing) {
      this.userService.followArtist(this.artist.id).subscribe(
        resp => {
          console.log('Artist Followed!');
          this.currentUser.followedArtists = Artist.generateArtistList(resp);
          this.isFollowing = true;
        },
        err => {
          console.error(err.message);
        }
      );
    } else {
      this.userService.unfollowArtist(this.artist.id).subscribe(
        resp => {
          console.log('Artist Unfollowed!');
          this.currentUser.followedArtists = Artist.generateArtistList(resp);
          this.isFollowing = false;
        },
        err => {
          console.error(err.message);
        }
      );
    }
  }
  loadAlbums(artistId: number) {
    this.albumService.getAlbumByArtist(artistId).subscribe(
      resp => {
        console.log(resp);
        this.albums = Album.generateAlbumList(resp);
        console.log(this.albums);
    },
      err => {
        console.error(err);
      }
  );
  }

  checkFollowing() {
    this.isFollowing = false;
    for (const artist of this.currentUser.followedArtists) {
      if (this.artist.id === artist.id) {
        this.isFollowing = true;
        break;
      }
    }
  }

  getRelated(artistId: any) {
    this.artistService.getRelatedArtists(artistId).subscribe(
      resp => {
        console.log(resp);
        this.relatedArtists = Artist.generateArtistList(resp);
      },
      err => {
        console.error(err);
      }
    );
  }
  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
    // this.userService.person.subscribe(person => this.person = person);
    this.route.params.subscribe(
      params => {
      this.artistService.getArtist(params['id']).subscribe(
        resp => {
          console.log(resp);
          this.artist = new Artist(resp);
          console.log(this.artist);
          this.loadAlbums(this.artist.id);
          this.checkFollowing();
          // let i = this.artist.id;
          this.getRelated(this.artist.id);
        },
        err => {
          console.error(err);
        }
      );
    });
  }
}
