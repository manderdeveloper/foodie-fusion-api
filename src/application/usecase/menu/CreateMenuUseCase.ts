import { CreateMenuDto } from "@application/dtos/controller/CreateMenuDto";
import DayOfWeek from "@domain/model/DayOfWeek";
import { Meal } from "@domain/model/Meal";
import { Menu } from "@domain/model/Menu";
import { User } from "@domain/model/User";
import { Week } from "@domain/model/Week";
import { DishRepository } from "@domain/repository/DishIngredient";
import { MenuRepository } from "@domain/repository/MenuRepository";
import { BadRequestError } from "@shared/error/BadRequestError";
import { injectable, inject } from "inversify";



@injectable()
export class CreateMenuUseCase {
  constructor(
    @inject('DishRepository') private dishRepository: DishRepository,
    @inject('MenuRepository') private menuRepository: MenuRepository
  ) {}

  public async execute(dto: CreateMenuDto, user: User): Promise<any> {
    const launches = await this.dishRepository.getAllLaunchesByUser(user.id.value);
    const dinners = await this.dishRepository.getAllDinnersByUser(user.id.value);

    if (launches.length < 7) throw new BadRequestError('Not enough launches');
    if (dinners.length < 7) throw new BadRequestError('Not enough dinners');

    let meals: Meal[] = [];
    let week: Week = Week.fromPrimitives({number: dto.weekNumber, year: dto.weekYear});
    for (let index = 0; index < 7; index++) {
      const dayOfWeek = DayOfWeek[index];
      const meal = Meal.fromPrimitives({dayOfWeek: dayOfWeek, launch: launches[index], dinner: dinners[index]})
      meals.push(meal);
    }
    const menu: Menu = Menu.fromPrimitives({id: dto.id, user: user.id, week: week, meals: meals })
    await this.menuRepository.create(menu);
  }

}