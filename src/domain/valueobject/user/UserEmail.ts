import { InvalidArgumentError } from "../primitives/InvalidArgumentError";
import { StringValueObject } from "../primitives/StringValueObject";

export class UserEmail extends StringValueObject {
  constructor(email: string) {
    super(email);
    this.isValidEmail(email);
  }

  private isValidEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${email}>`);
    }
  }
}