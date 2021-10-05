
export class User {
  private _firstName: string;

  private _lastName: string;

  private _password: string;

  private _email: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._password = password;
  
  }

  public get firstName(): string {
    return this._firstName;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public set lastName(value: string) {
    this._lastName = value;
  }

  public get email(): string {
    return this._email;
  }
}
