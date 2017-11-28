export class Follower {

  private _id: number;
  private _userName: string;
  private _firstName: string;
  private _lastName: string;

  constructor(info: any) {
    this._id = info.id;
    this._userName = info.userName;
    this._firstName = info.firstName;
    this._lastName = info.lastName;
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
}
