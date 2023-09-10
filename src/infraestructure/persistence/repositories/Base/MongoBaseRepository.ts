import mongoose, { Document, Model, Schema } from 'mongoose';
import { BaseRepository } from "@domain/repository/BaseRepository";
import { initializeMongoDB } from '@infraestructure/config/database/mongo/mongo';
import { injectable } from 'inversify';

interface ConvertibleToPrimitives<T> {
  fromPrimitives(primitives: any): T;
  toPrimitives(): any;
}

@injectable()
export abstract class MongoBaseRepository<TDomain, TMongo> implements BaseRepository<TDomain> {
  protected model: Model<TMongo>;

  constructor() {
    if (!mongoose.connection.readyState) {
      initializeMongoDB();
    }
  }
  async getAll(): Promise<TDomain[]> {
    let domainItems = [];
    const items = await this.model.find({}).exec();
    for (let item of items) {
      const itemDomain = this.mapToDomainModel(item.toObject());
      domainItems.push(itemDomain);
    }
    return domainItems;
  }
  async getById(id: string): Promise<TDomain> {
    const item = await this.model.findOne({id:id}).exec();
    const domainItem = await this.mapToDomainModel(item.toObject());
    return domainItem;
  }
  async create(model: TDomain): Promise<void> {
    await this.model.create(this.mapToMongooseModel(model));
  }

  protected abstract mapToDomainModel(mongooseModel: TMongo): TDomain;
  protected abstract mapToMongooseModel(domainModel: TDomain): TMongo;
}