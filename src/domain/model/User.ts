import { UserEmail } from "../valueobject/user/UserEmail";
import { UserId } from "../valueobject/user/UserId";
import { UserLastName } from "../valueobject/user/UserLastName";
import { UserName } from "../valueobject/user/UserName";


export class User {
  readonly id: UserId;
  readonly email: UserEmail;
  readonly name: UserName;
  readonly lastname: UserLastName;
  //readonly role: Role;

  constructor (id: UserId, email: UserEmail, name: UserName, lastname: UserLastName) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.lastname = lastname;
  }

  static fromPrimitives (plainData: {id: string, email: string, name: string, lastname: string}): User {
    return new User(
      new UserId(plainData.id),
      new UserEmail(plainData.email),
      new UserName(plainData.name),
      new UserLastName(plainData.lastname)
    )
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      name: this.name.value,
      lastname: this.email.value,
      email: this.email.value
    }
  }
}