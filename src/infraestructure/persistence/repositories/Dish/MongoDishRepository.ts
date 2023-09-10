import { injectable } from "inversify";
import { MongoBaseRepository } from "../Base/MongoBaseRepository";
import { Dish } from "@domain/model/Dish";
import { DishDocument, DishModel } from "@infraestructure/config/database/mongo/models/DishModel";
import FoodType from "@domain/model/FoodType";


@injectable()
export class MongoDishRepository extends MongoBaseRepository<Dish, DishDocument> {
  constructor() {
    super()
    this.model = DishModel;
  }

  async getAllDishesByUser(userId: string): Promise<Dish[]> {
    let domainItems = [];
    const items = await this.model.find({user: userId}).exec();;
    for (let item of items) {
      const itemDomain = this.mapToDomainModel(item.toObject());
      domainItems.push(itemDomain);
    }
    return domainItems;
  }

  async getAllLaunchesByUser(userId: string): Promise<Dish[]> {
    let domainItems = [];
    const items = await this.model.find({user: userId, type: {$in: [FoodType.BOTH.toString(), FoodType.LAUNCH.toString()]}}).exec();
    for (let item of items) {
      const itemDomain = this.mapToDomainModel(item.toObject());
      domainItems.push(itemDomain);
    }
    return domainItems;
  }

  async getAllDinnersByUser(userId: string): Promise<Dish[]> {
    let domainItems = [];
    const items = await this.model.find({user: userId, type: {$in: [FoodType.BOTH.toString(), FoodType.DINNER.toString()]}}).exec();
    for (let item of items) {
      const itemDomain = this.mapToDomainModel(item.toObject());
      domainItems.push(itemDomain);
    }
    return domainItems;
  } 

  protected mapToDomainModel(mongooseModel: DishDocument): Dish {
    return Dish.fromPrimitives({
      id: mongooseModel.id,
      name: mongooseModel.name,
      ingredients: [],
      type: mongooseModel.type,
      recipe: mongooseModel.recipe,
      description: mongooseModel.description,
      user: mongooseModel.user
    });
  }
  protected mapToMongooseModel(domainModel: Dish): DishDocument {
    return domainModel.toPrimitives();
  }
  
}