import { CreateIngredientUseCase } from "../application/useCases/ingredient/CreateIngredientUseCase";
import { ListIngredientUseCase } from "../application/useCases/ingredient/ListIngredientUseCase";
import { IngredientRepository } from "../domain/repositories/IngredientRepository";
import { InMemoryIngredientRepository } from "../infraestructure/persistence/repositories/Dish/InMemoryDishRepository";
import { HealthController } from "../interfaces/controllers/HealthController";
import { IngredientController } from "../interfaces/controllers/IngredientController";
import { CONTROLLERTYPES } from "../shared/types/ControllerTypes";
import { USECASETYPES } from "../shared/types/UseCaseTypes";
import { container } from "./containerBase";

// Repositories
container.bind<IngredientRepository>('IngredientRepository').toConstantValue(new InMemoryIngredientRepository);

// Controllers
container.bind<HealthController>(CONTROLLERTYPES.HealthController).to(HealthController);
container.bind<IngredientController>(CONTROLLERTYPES.IngredientController).to(IngredientController);

//UseCases
container.bind<CreateIngredientUseCase>(USECASETYPES.CreateIngredientUseCase).to(CreateIngredientUseCase);
container.bind<ListIngredientUseCase>(USECASETYPES.ListIngredientUseCase).to(ListIngredientUseCase);
