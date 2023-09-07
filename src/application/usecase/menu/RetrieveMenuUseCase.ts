import { User } from "@domain/model/User";
import { MenuRepository } from "@domain/repository/MenuRepository";
import { NotFoundError } from "@shared/error/NotFoundError";
import { injectable, inject, id } from "inversify";


@injectable()
export class RetrieveMenuUseCase {
  constructor(
    @inject('MenuRepository') private menuRepository: MenuRepository
  ) {}

  public async execute(id: string, user: User): Promise<any> {
    const menu = await this.menuRepository.getByIdAndUser(id, user.id.value);
    if (!menu) throw new NotFoundError();
    return menu.toPrimitives();
  }

}