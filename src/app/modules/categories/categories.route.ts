import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import {
  createCategoryZodSchema,
  updateCategoryZodSchema,
} from './categories.validation';
import { CategoryController } from './categories.controller';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

router
  .route('/')
  .post(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    validateRequest(createCategoryZodSchema),
    CategoryController.createCategory
  )
  .get(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
    CategoryController.getCategory
  );

router
  .route('/:id')
  .get(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
    CategoryController.getSingleCategory
  )
  .patch(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    validateRequest(updateCategoryZodSchema),
    CategoryController.updateCategory
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    CategoryController.deleeteCategory
  );

export const categoryRoutes = router;
