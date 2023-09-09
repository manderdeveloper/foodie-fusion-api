import { Menu } from "@domain/model/Menu";
import { injectable } from "inversify";
import { InMemoryBaseRepository } from "../Base/InMemoryBaseRepository";

@injectable()
export class InMemoryMenuRepository extends InMemoryBaseRepository<Menu> {

  getByIdAndUser(id: string, userId: string): Promise<Menu | undefined> {
    const menu = this.items.find(menu => menu.user.value === userId && menu.id.value === id);
    return Promise.resolve(menu || undefined);
  }
  
  getByUser(userId: string): Promise<Menu[]> {
    const menus = this.items.filter(menu => menu.user.value === userId);
    return Promise.resolve(menus);
  }

  getAllMenuByUser(userId: string) {
    const menu = this.items.filter(menu => menu.user.value === userId);
    return Promise.resolve(menu || []);
  }
}