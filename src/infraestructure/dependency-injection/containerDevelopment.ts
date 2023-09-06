import { CreateDishUseCase } from "../../application/usecase/dish/CreateDishUseCase";
import { ListDishUseCase } from "../../application/usecase/dish/ListDishUseCase";
import { CreateIngredientUseCase } from "../../application/usecase/ingredient/CreateIngredientUseCase";
import { ListIngredientUseCase } from "../../application/usecase/ingredient/ListIngredientUseCase";
import { DishRepository } from "../../domain/repository/DishIngredient";
import { IngredientRepository } from "../../domain/repository/IngredientRepository";
import { InMemoryDishRepository } from "../persistence/repositories/Dish/InMemoryDishRepository";
import { InMemoryIngredientRepository } from "../persistence/repositories/Ingredient/InMemoryIngredientRepository";
import { DishController } from "../../application/interface/controller/DishController";
import { HealthController } from "../../application/interface/controller/HealthController";
import { IngredientController } from "../../application/interface/controller/IngredientController";
import { CONTROLLERTYPES } from "../../shared/type/ControllerTypes";
import { USECASETYPES } from "../../shared/type/UseCaseTypes";
import { container } from "./containerBase";
import { Logger } from "../../application/interface/middleware/Logger";
import { ConsoleLogger } from "../logging/ConsoleLogger";
import { UserRepository } from "../../domain/repository/UserRepository";
import { InMemoryUserRepository } from "../persistence/repositories/User/InMemoryUserRepository";
import { UserController } from "../../application/interface/controller/UserController";
import { CreateUserUseCase } from "../../application/usecase/user/CreateUserCase";
import { ListUserUseCase } from "../../application/usecase/user/ListUserUseCase";

// Repositories
container.bind<IngredientRepository>('IngredientRepository').toConstantValue(new InMemoryIngredientRepository);
container.bind<DishRepository>('DishRepository').toConstantValue(new InMemoryDishRepository);
container.bind<UserRepository>('UserRepository').toConstantValue(new InMemoryUserRepository);

// Controllers
container.bind<HealthController>(CONTROLLERTYPES.HealthController).to(HealthController);
container.bind<IngredientController>(CONTROLLERTYPES.IngredientController).to(IngredientController);
container.bind<DishController>(CONTROLLERTYPES.DishController).to(DishController);
container.bind<UserController>(CONTROLLERTYPES.UserController).to(UserController);

//UseCases
container.bind<CreateIngredientUseCase>(USECASETYPES.CreateIngredientUseCase).to(CreateIngredientUseCase);
container.bind<ListIngredientUseCase>(USECASETYPES.ListIngredientUseCase).to(ListIngredientUseCase);

container.bind<CreateDishUseCase>(USECASETYPES.CreateDishUseCase).to(CreateDishUseCase);
container.bind<ListDishUseCase>(USECASETYPES.ListDishUseCase).to(ListDishUseCase);

container.bind<CreateUserUseCase>(USECASETYPES.CreateUserUseCase).to(CreateUserUseCase);
container.bind<ListUserUseCase>(USECASETYPES.ListUserUseCase).to(ListUserUseCase);

//Middlewares
container.bind<Logger>('Logger').to(ConsoleLogger);