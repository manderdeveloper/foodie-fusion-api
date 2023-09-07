import { Menu } from "@domain/model/Menu";
import { MenuRepository } from "@domain/repository/MenuRepository";
import { injectable } from "inversify";

@injectable()
export class InMemoryMenuRepository implements MenuRepository {
  private menu : Menu[] = [];

  getAll(): Promise<Menu[]> {
    return Promise.resolve(this.menu);
  }

  getAllMenuByUser(userId: string) {
    const menu = this.menu.filter(menu => menu.user.value === userId);
    return Promise.resolve(menu || []);
  }

  getById(id: string): Promise<Menu | null> {
    const menu = this.menu.find(menu => menu.id.value === id);
    return Promise.resolve(menu || null);
  }

  create(model: Menu): Promise<void> {
    this.menu.push(model);
    return Promise.resolve();
  }

  update(model: Menu): Promise<void> {
    const index = this.menu.findIndex((menu) => menu.id.value === model.id.value);
    if (index === -1) {
      this.menu[index] = model;
    }
    return Promise.resolve();
  }

  delete(id: string): Promise<void> {
    const index = this.menu.findIndex((menu) => menu.id.value === id);
    if (index !== -1) {
      this.menu.splice(index, 1);
    }
    return Promise.resolve();
  }

  getByIdAndUser(id: string, userId: string): Promise<Menu | undefined> {
    const menu = this.menu.find(menu => menu.user.value === userId && menu.id.value === id);
    return Promise.resolve(menu || undefined);
  }
  
  getByUser(userId: string): Promise<Menu[]> {
    const menus = this.menu.filter(menu => menu.user.value === userId);
    return Promise.resolve(menus);
  }
}