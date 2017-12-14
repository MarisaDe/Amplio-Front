import {Follower} from './follower';
import {Config} from "../common/config";
import {Playlist} from "./playlist";
import {Artist} from "./artist";

export class User {

  private _id: number;
  private _userName: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _following: Follower[];
  private _followers: Follower[];
  private _isPremium: boolean;
  private _profilePicture: any;
  private _followedPlaylists: Playlist[];
  private _followedArtists: Artist[];
  // private _playlists: Playlist[];

  constructor (info: any) {
    if (typeof info === 'string') {
      this._userName = info;
    } else {
      this._id = info.id;
      this._userName = info.userName;
      this._firstName = info.firstName;
      this._lastName = info.lastName;
      this._email = info.email;
      this._isPremium = info.premium;
      this._following = User.generateFollowerList(info.following);
      this._followers = User.generateFollowerList(info.followers);
      if (info.profilePicture == null) {
        this._profilePicture = Config.PROFILE_DEFAULT_IMAGE;
      }else {
        this._profilePicture = info.profilePicture;
      }
      this._followedPlaylists = Playlist.generatePlaylistList(info.followedPlaylists);
      this._followedArtists = Artist.generateArtistList(info.followedArtists);
      // this._playlists = Playlist.generateUserPlaylists(info.playlists);
    }
  }

  public static generateFollowerList(followers: any): Follower[] {
    const followerList: Follower[] = Array<Follower>();
    for (const follower of followers) {
      followerList.push(new Follower(follower));
    }
    return followerList;
  }

  get name(): string {
    return this._firstName + ' ' + this._lastName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get following(): Follower[] {
    return this._following;
  }

  set following(value: Follower[]) {
    this._following = value;
  }

  get followers(): Follower[] {
    return this._followers;
  }

  set followers(value: Follower[]) {
    this._followers = value;
  }

  get isPremium(): boolean {
    return this._isPremium;
  }

  set isPremium(value: boolean) {
    this._isPremium = value;
  }

  get profilePicture(): any {
    return this._profilePicture;
  }

  set profilePicture(value: any) {
    this._profilePicture = value;
  }

  get followedPlaylists(): Playlist[] {
    return this._followedPlaylists;
  }

  set followedPlaylists(value: Playlist[]) {
    this._followedPlaylists = value;
  }

  get followedArtists(): Artist[] {
    return this._followedArtists;
  }

  set followedArtists(value: Artist[]) {
    this._followedArtists = value;
  }

  // get playlists(): Playlist[] {
  //   return this._playlists;
  // }
  //
  // set playlists(value: Playlist[]) {
  //   this._playlists = value;
  // }
}
