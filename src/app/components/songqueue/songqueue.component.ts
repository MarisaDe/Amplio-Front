import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {Playlist} from '../../models/playlist';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AudioService} from '../../services/audio/audio.service';
import {Config} from '../../common/config';

@Component({
  selector: 'songqueue',
  templateUrl: './songqueue.component.html',
  styleUrls: ['./songqueue.component.css', '../../main.css']
})
export class SongqueueComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService,
              private playlistService: PlaylistService,
              private audioService: AudioService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

  }
}
