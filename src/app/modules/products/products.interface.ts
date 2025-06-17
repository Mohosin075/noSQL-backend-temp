import { Model, Types } from 'mongoose';

export type IProduct = {
  name: string;
  description?: string;
  price: number;
  category: Types.ObjectId;
  quantity: number;
  createdBy: Types.ObjectId;
  images?: string[];
  thumbnail?: string;
  tags?: string[];
  isFeatured: boolean;
  isActive: boolean;
};

export type ProductModel = Model<IProduct>;
