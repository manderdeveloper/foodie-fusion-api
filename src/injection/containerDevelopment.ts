import { HealthController } from "../interfaces/controllers/HealthController";
import { CONTROLLERTYPES } from "../shared/types/ControllerTypes";
import { container } from "./containerBase";

container.bind<HealthController>(CONTROLLERTYPES.HealthController).to(HealthController);