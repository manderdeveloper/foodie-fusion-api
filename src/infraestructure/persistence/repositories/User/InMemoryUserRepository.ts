import { User } from "@domain/model/User";
import { UserRepository } from "@domain/repository/UserRepository";
import { injectable } from "inversify";

@injectable()
export class InMemoryUserRepository implements UserRepository {
  
  private users : User[] = [];

  getAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  getById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id.value === id);
    return Promise.resolve(user || null);
  }

  create(model: User): Promise<void> {
    this.users.push(model);
    return Promise.resolve();
  }

  update(model: User): Promise<void> {
    const index = this.users.findIndex((user) => user.id.value === model.id.value);
    if (index === -1) {
      this.users[index] = model;
    }
    return Promise.resolve();
  }

  delete(id: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id.value === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
    return Promise.resolve();
  }

  getByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email.value === email);
    return Promise.resolve(user || null);
  }

}