import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ProductServices } from './products.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const data = {
    ...req.body,
    createdBy: userId,
  };

  const result = await ProductServices.createProductFromDB(data);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Product created successfully.',
    data: result,
  });
});

const getProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.getProductsFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Product data retrieved successfully.',
    data: result,
  });
});

const getSingleProducts = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ProductServices.getSingleProductFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Product data retrieved successfully.',
    data: result,
  });
});

const updateProducts = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const { ...data } = req.body;

  const result = await ProductServices.updateProductFromDB(id, data);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Product data updated successfully.',
    data: result,
  });
});

const deleteProducts = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ProductServices.deleteProductFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Product data deleted successfully.',
    data: result,
  });
});

export const productController = {
  createProduct,
  getProducts,
  getSingleProducts,
  updateProducts,
  deleteProducts,
};
