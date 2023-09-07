import { injectable, inject } from "inversify";
import { User } from "../../../domain/model/User";
import { MenuRepository } from "../../../domain/repository/MenuRepository";

@injectable()
export class ListMenuUseCase {
  constructor(
    @inject('MenuRepository') private menuRepository: MenuRepository
  ) {}

  public async execute(user: User): Promise<any> {
    const menus = await this.menuRepository.getByUser(user.id.value);
    return menus.map(menu => menu.toPrimitives())
  }

}