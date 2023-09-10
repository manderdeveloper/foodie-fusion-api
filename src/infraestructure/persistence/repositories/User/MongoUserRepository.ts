import { User } from "@domain/model/User";
import { injectable } from "inversify";
import { MongoBaseRepository } from "../Base/MongoBaseRepository";
import { UserDocument, UserModel } from "@infraestructure/config/database/mongo/models/UserModel";
import { Model } from "mongoose";

@injectable()
export class MongoUserRepository extends MongoBaseRepository<User, UserDocument> {
  
  constructor() {
    super()
    this.model = UserModel;
  }
  
  async getByEmail(email: string): Promise<User> {
    const user = await this.model.findOne({email: email}).exec();
    const domainUser = await this.mapToDomainModel(user.toObject());
    return domainUser;
  }

  protected mapToDomainModel(mongooseModel: UserDocument): User {
    return User.fromPrimitives(mongooseModel);
  }
  protected mapToMongooseModel(domainModel: User): UserDocument {
    return domainModel.toPrimitives();
  }

}