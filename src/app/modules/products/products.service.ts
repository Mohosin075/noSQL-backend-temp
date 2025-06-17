import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IProduct } from './products.interface';
import { Product } from './products.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createProductFromDB = async (data: IProduct) => {
  return await Product.create(data);
};

const getProductsFromDB = async (query: Record<string, any>) => {
  const baseQuery = Product.find({});

  const queryBuilder = new QueryBuilder(baseQuery, query)
    .search(['name', 'description'])
    .filter()
    .sort()
    .fields()
    .paginate()
    .populate(['category', 'createdBy'], {});

  const products = await queryBuilder.modelQuery;

  const meta = await queryBuilder.getPaginationInfo();

  return {
    meta,
    data: products,
  };
};

const getSingleProductFromDB = async (id: string) => {
  const isExistProducts = await Product.findById(id);
  if (!isExistProducts) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Product doesnt exist!');
  }

  return isExistProducts;
};

const updateProductFromDB = async (id: string, payload: Partial<IProduct>) => {
  const isExistProducts = await Product.findById(id);
  if (!isExistProducts) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Product doesnt exist!');
  }

  return await Product.findByIdAndUpdate(id, payload, { new: true });
};

const deleteProductFromDB = async (id: string) => {
  const isExistProducts = await Product.findById(id);
  if (!isExistProducts) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Product doesnt exist!');
  }

  return await Product.findByIdAndDelete(id);
};

export const ProductServices = {
  createProductFromDB,
  getProductsFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};
