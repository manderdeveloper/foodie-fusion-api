import { CreateDishUseCase } from "../../application/useCases/dish/CreateDishUseCase";
import { ListDishUseCase } from "../../application/useCases/dish/ListDishUseCase";
import { CreateIngredientUseCase } from "../../application/useCases/ingredient/CreateIngredientUseCase";
import { ListIngredientUseCase } from "../../application/useCases/ingredient/ListIngredientUseCase";
import { DishRepository } from "../../domain/repositories/DishIngredient";
import { IngredientRepository } from "../../domain/repositories/IngredientRepository";
import { InMemoryDishRepository } from "../persistence/repositories/Dish/InMemoryDishRepository";
import { InMemoryIngredientRepository } from "../persistence/repositories/Ingredient/InMemoryIngredientRepository";
import { DishController } from "../../interfaces/controllers/DishController";
import { HealthController } from "../../interfaces/controllers/HealthController";
import { IngredientController } from "../../interfaces/controllers/IngredientController";
import { CONTROLLERTYPES } from "../../shared/types/ControllerTypes";
import { USECASETYPES } from "../../shared/types/UseCaseTypes";
import { container } from "./containerBase";

// Repositories
container.bind<IngredientRepository>('IngredientRepository').toConstantValue(new InMemoryIngredientRepository);
container.bind<DishRepository>('DishRepository').toConstantValue(new InMemoryDishRepository);

// Controllers
container.bind<HealthController>(CONTROLLERTYPES.HealthController).to(HealthController);
container.bind<IngredientController>(CONTROLLERTYPES.IngredientController).to(IngredientController);
container.bind<DishController>(CONTROLLERTYPES.DishController).to(DishController);

//UseCases
container.bind<CreateIngredientUseCase>(USECASETYPES.CreateIngredientUseCase).to(CreateIngredientUseCase);
container.bind<ListIngredientUseCase>(USECASETYPES.ListIngredientUseCase).to(ListIngredientUseCase);

container.bind<CreateDishUseCase>(USECASETYPES.CreateDishUseCase).to(CreateDishUseCase);
container.bind<ListDishUseCase>(USECASETYPES.ListDishUseCase).to(ListDishUseCase);
