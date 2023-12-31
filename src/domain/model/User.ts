import container from "@dependency-injection/container";
import { PasswordService } from "@domain/service/PasswordService";
import { UserEmail } from "@domain/valueobject/user/UserEmail";
import { UserId } from "@domain/valueobject/user/UserId";
import { UserLastName } from "@domain/valueobject/user/UserLastName";
import { UserName } from "@domain/valueobject/user/UserName";
import { UserPassword } from "@domain/valueobject/user/UserPassword";


export class User {
  readonly id: UserId;
  readonly email: UserEmail;
  readonly name: UserName;
  readonly lastname: UserLastName;
  readonly password: UserPassword;

  constructor (id: UserId, email: UserEmail, name: UserName, lastname: UserLastName, password: UserPassword) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.lastname = lastname;
    this.password = password;
  }

  static async createFromPrimitives (plainData: {id: string, email: string, name: string, lastname: string, password: string}): Promise<User> {
    const passwordService = container.get<PasswordService>('PasswordService');
    const hashedPassword = await passwordService.hashPassword(plainData.password);

    return new User(
      new UserId(plainData.id),
      new UserEmail(plainData.email),
      new UserName(plainData.name),
      new UserLastName(plainData.lastname),
      new UserPassword(hashedPassword)
    )
  }

  static fromPrimitives (plainData: {id: string, email: string, name: string, lastname: string, password: string}): User {
    return new User(
      new UserId(plainData.id),
      new UserEmail(plainData.email),
      new UserName(plainData.name),
      new UserLastName(plainData.lastname),
      new UserPassword(plainData.password)
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