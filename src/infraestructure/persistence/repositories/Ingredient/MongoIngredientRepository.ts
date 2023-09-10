import { Ingredient } from "@domain/model/Ingredient";
import { injectable } from "inversify";
import { MongoBaseRepository } from "../Base/MongoBaseRepository";
import { IngredientDocument, IngredientModel } from "@infraestructure/config/database/mongo/models/IngredientModel";


@injectable()
export class MongoIngredientRepository extends MongoBaseRepository<Ingredient, IngredientDocument> {
  constructor() {
    super()
    this.model = IngredientModel;
  }

  async getAllIngredientsByUser(userId: string): Promise<Ingredient[]> {
    let domainItems = [];
    const items = await this.model.find({user: userId}).exec();;
    for (let item of items) {
      const itemDomain = this.mapToDomainModel(item.toObject());
      domainItems.push(itemDomain);
    }
    return domainItems;
  }

  protected mapToDomainModel(mongooseModel: IngredientDocument): Ingredient {
    return Ingredient.fromPrimitives(mongooseModel);
  }
  protected mapToMongooseModel(domainModel: Ingredient): IngredientDocument {
    return domainModel.toPrimitives();
  }
  
}