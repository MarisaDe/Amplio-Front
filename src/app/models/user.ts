import {Follower} from './follower';

export class User {

  private _id: number;
  private _userName: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _following: Follower[];
  private _followers: Follower[];
  private _isPremium: boolean;
  // TODO
  // private _profilePicture: any;

  constructor (info: any) {
    if (typeof info === 'string') {
      this._userName = info;
    } else {
      this._id = info.userId;
      this._userName = info.userName;
      this._firstName = info.firstName;
      this._lastName = info.lastName;
      this._email = info.email;
      this._isPremium = info.isPremium;
      this._following = this.generateFollowerList(info.following);
      this._followers = this.generateFollowerList(info.followers);
    }
  }

  generateFollowerList(followers: any): Follower[] {
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

}
