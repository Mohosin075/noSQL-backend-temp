import { model, Schema } from 'mongoose';
import { IProduct, ProductModel } from './products.interface';

const productSchema = new Schema<IProduct, ProductModel>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    quantity: { type: Number, required: true, min: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User'},
    images: [{ type: String }],
    thumbnail: { type: String },
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product = model<IProduct, ProductModel>('Product', productSchema);
