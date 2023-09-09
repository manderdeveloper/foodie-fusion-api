import { Searchable } from "@domain/model/Searchable";
import { BaseRepository } from "@domain/repository/BaseRepository";


export class InMemoryBaseRepository<T extends Searchable> implements BaseRepository<T> {
  protected items: T[] = [];

  getAll(): Promise<T[]> {
    return Promise.resolve(this.items);
  }
  getById(id: string): Promise<T> {
    const item = this.items.find(item => item.id.value === id);
    return Promise.resolve(item || null);
  }
  create(model: T): Promise<void> {
    this.items.push(model);
    return Promise.resolve();
  }
  update(model: T): Promise<void> {
    const index = this.items.findIndex((item) => item.id.value === model.id.value);
    if (index === -1) {
      this.items[index] = model;
    }
    return Promise.resolve();
  }
  delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id.value === id);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
    return Promise.resolve();
  }
  
}