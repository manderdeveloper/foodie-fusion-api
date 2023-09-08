import { AuthController } from "@application/interface/controller/v1/AuthController";
import { DishController } from "@application/interface/controller/DishController";
import { HealthController } from "@application/interface/controller/HealthController";
import { IngredientController } from "@application/interface/controller/IngredientController";
import { MenuController } from "@application/interface/controller/MenuController";
import { UserController } from "@application/interface/controller/UserController";
import { Logger } from "@application/interface/middleware/Logger";
import { AuthService } from "@application/service/AuthService";
import { CreateDishUseCase } from "@application/usecase/dish/CreateDishUseCase";
import { ListDishUseCase } from "@application/usecase/dish/ListDishUseCase";
import { CreateIngredientUseCase } from "@application/usecase/ingredient/CreateIngredientUseCase";
import { ListIngredientUseCase } from "@application/usecase/ingredient/ListIngredientUseCase";
import { CreateMenuUseCase } from "@application/usecase/menu/CreateMenuUseCase";
import { ListMenuUseCase } from "@application/usecase/menu/ListMenuUseCase";
import { RetrieveMenuUseCase } from "@application/usecase/menu/RetrieveMenuUseCase";
import { CreateUserUseCase } from "@application/usecase/user/CreateUserCase";
import { ListUserUseCase } from "@application/usecase/user/ListUserUseCase";
import { DishRepository } from "@domain/repository/DishIngredient";
import { IngredientRepository } from "@domain/repository/IngredientRepository";
import { MenuRepository } from "@domain/repository/MenuRepository";
import { UserRepository } from "@domain/repository/UserRepository";
import { AuthTokenService } from "@domain/service/AuthTokenService";
import { PasswordService } from "@domain/service/PasswordService";
import { ConsoleLogger } from "@infraestructure/logging/ConsoleLogger";
import { InMemoryDishRepository } from "@infraestructure/persistence/repositories/Dish/InMemoryDishRepository";
import { InMemoryIngredientRepository } from "@infraestructure/persistence/repositories/Ingredient/InMemoryIngredientRepository";
import { InMemoryMenuRepository } from "@infraestructure/persistence/repositories/Menu/InMemoryMenuRepository";
import { InMemoryUserRepository } from "@infraestructure/persistence/repositories/User/InMemoryUserRepository";
import { BcryptPasswordService } from "@infraestructure/service/BcryptPasswordService";
import { JWTAuthTokenService } from "@infraestructure/service/JWTAuthTokenService";
import { CONTROLLERTYPES } from "@shared/type/ControllerTypes";
import { USECASETYPES } from "@shared/type/UseCaseTypes";
import { container } from "./containerBase";


// Repositories
container.bind<IngredientRepository>('IngredientRepository').toConstantValue(new InMemoryIngredientRepository);
container.bind<DishRepository>('DishRepository').toConstantValue(new InMemoryDishRepository);
container.bind<UserRepository>('UserRepository').toConstantValue(new InMemoryUserRepository);
container.bind<MenuRepository>('MenuRepository').toConstantValue(new InMemoryMenuRepository)

// Controllers
container.bind<HealthController>(CONTROLLERTYPES.HealthController).to(HealthController);
container.bind<IngredientController>(CONTROLLERTYPES.IngredientController).to(IngredientController);
container.bind<DishController>(CONTROLLERTYPES.DishController).to(DishController);
container.bind<UserController>(CONTROLLERTYPES.UserController).to(UserController);
container.bind<AuthController>(CONTROLLERTYPES.AuthController).to(AuthController);
container.bind<MenuController>(CONTROLLERTYPES.MenuController).to(MenuController)

//UseCases
container.bind<CreateIngredientUseCase>(USECASETYPES.CreateIngredientUseCase).to(CreateIngredientUseCase);
container.bind<ListIngredientUseCase>(USECASETYPES.ListIngredientUseCase).to(ListIngredientUseCase);

container.bind<CreateDishUseCase>(USECASETYPES.CreateDishUseCase).to(CreateDishUseCase);
container.bind<ListDishUseCase>(USECASETYPES.ListDishUseCase).to(ListDishUseCase);

container.bind<CreateUserUseCase>(USECASETYPES.CreateUserUseCase).to(CreateUserUseCase);
container.bind<ListUserUseCase>(USECASETYPES.ListUserUseCase).to(ListUserUseCase);

container.bind<CreateMenuUseCase>(USECASETYPES.CreateMenuUseCase).to(CreateMenuUseCase);
container.bind<RetrieveMenuUseCase>(USECASETYPES.RetrieveMenuUseCase).to(RetrieveMenuUseCase);
container.bind<ListMenuUseCase>(USECASETYPES.ListMenuUseCase).to(ListMenuUseCase);

//Services
container.bind<AuthService>('AuthService').to(AuthService);
container.bind<PasswordService>('PasswordService').to(BcryptPasswordService);
container.bind<AuthTokenService>('AuthTokenService').to(JWTAuthTokenService);

//Middlewares
container.bind<Logger>('Logger').to(ConsoleLogger);

