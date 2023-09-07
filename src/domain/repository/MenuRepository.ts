import { Menu } from "@domain/model/Menu";
import { BaseRepository } from "./BaseRepository";


export interface MenuRepository extends BaseRepository<Menu> {
  getByIdAndUser(id: string, userId: string): Promise<Menu | undefined>;
  getByUser(userId: string): Promise<Menu[]>;
}
