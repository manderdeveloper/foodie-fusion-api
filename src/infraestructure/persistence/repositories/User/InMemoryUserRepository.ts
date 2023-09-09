import { User } from "@domain/model/User";
import { injectable } from "inversify";
import { InMemoryBaseRepository } from "../Base/InMemoryBaseRepository";

@injectable()
export class InMemoryUserRepository extends InMemoryBaseRepository<User> {

  getByEmail(email: string): Promise<User | null> {
    const user = this.items.find(user => user.email.value === email);
    return Promise.resolve(user || null);
  }

}