export class User {
  private _id: number;
  private _username: string;
  private _firstName: string;
  private _lastName: string;
  public friends: User[];

  constructor (
    username: string,
  ) {
    this._username = username;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
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


  // get friends(): User[]{
  //   return this._friends;
  // }
  //
  // set friends(value: User[]) {
  //   this._friends = value;
  // }

}
