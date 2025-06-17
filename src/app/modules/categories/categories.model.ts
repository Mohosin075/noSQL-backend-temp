import { model, Schema } from 'mongoose';
import { CategoryModel, ICategory } from './categories.interface';


const categorySchema = new Schema<ICategory, CategoryModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Category = model<ICategory, CategoryModel>(
  'Category',
  categorySchema
);
