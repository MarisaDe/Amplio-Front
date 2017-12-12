import {Config} from "../common/config";

export class Follower {

  private _id: number;
  private _userName: string;
  private _firstName: string;
  private _lastName: string;
  private _profilePicture: any;

  constructor(info: any) {
    this._id = info.id;
    this._userName = info.userName;
    this._firstName = info.firstName;
    this._lastName = info.lastName;
    if (info.profilePicture == null) {
      this._profilePicture = Config.PROFILE_DEFAULT_IMAGE;
    }else {
      this._profilePicture = info.profilePicture;
    }
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

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get profilePicture(): any {
    return this._profilePicture;
  }

  set profilePicture(value: any) {
    this._profilePicture = value;
  }
}
