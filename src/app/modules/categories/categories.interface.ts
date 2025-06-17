import { Model } from 'mongoose';

export type ICategory = {
  name: string;
  description?: string;
};

export type CategoryModel = Model<ICategory>;
