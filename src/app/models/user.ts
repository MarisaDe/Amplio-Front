export class User {
  private id: number;
  private username: string;
  private firstName: string;
  private lastName: string;
  private friends: User[];

  constructor (
    info: any
  ) {
    if (typeof info === 'string') {
      this.username = info;
    } else {
      console.log('todo');
    }
  }

  get getId(): number {
    return this.id;
  }

  set setId(value: number) {
    this.id = value;
  }

  get name(): string {
    return this.firstName + ' ' + this.lastName;
  }

  set setFirstName(value: string) {
    this.firstName = value;
  }

  set setLastName(value: string) {
    this.lastName = value;
  }

  get getFriends(): User[]{
    return this.friends;
  }

  set setFriends(value: User[]) {
    this.friends = value;
  }

}
