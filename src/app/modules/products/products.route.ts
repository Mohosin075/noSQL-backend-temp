import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { createProductZodSchema } from './products.validation';
import { productController } from './products.controller';

const router = express.Router();

router
  .route('/')
  .post(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    validateRequest(createProductZodSchema),
    productController.createProduct
  )
  .get(productController.getProducts);

router
  .route('/:id')
  .get(productController.getSingleProducts)
  .patch(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    productController.updateProducts
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    productController.deleteProducts
  );

export const productRoutes = router;
