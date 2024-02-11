import { Router } from 'express';

import {
	createBodyValidator,
	idValidator,
	paginationValidator,
} from '@middlewares';

import { ROUTER_BOOK } from '@lib/constants';

import { CategoryController } from './category.controller';
import { CreateOrUpdateCategoryPayloadSchema } from './category.schemes';

const categoryRouter = Router();

const controller = new CategoryController();

const createOrUpdateBodyValidator = createBodyValidator(
	CreateOrUpdateCategoryPayloadSchema
);

/*
 * GET: Get categories list
 * */
categoryRouter.get(
	ROUTER_BOOK.CATEGORY.ROOT,

	// Validation
	paginationValidator,

	// Controller
	controller.getList
);

/*
 * GET: Get category by ID
 * */
categoryRouter.get(
	ROUTER_BOOK.CATEGORY.BY_ID,

	// Validation
	idValidator,

	// Controller
	controller.getById
);

/*
 * GET: Get category by ID with related products
 * */
categoryRouter.get(
	ROUTER_BOOK.CATEGORY.PRODUCT,

	// Validation
	idValidator,
	paginationValidator,

	// Controller
	controller.getByIdWithProducts
);

/*
 * POST: Create category
 * */
categoryRouter.post(
	ROUTER_BOOK.CATEGORY.ROOT,

	// Validation
	createOrUpdateBodyValidator,

	// Controller
	controller.create
);

/*
 * PUT: Update category by ID
 * */
categoryRouter.put(
	ROUTER_BOOK.CATEGORY.BY_ID,

	// Validation
	idValidator,
	createOrUpdateBodyValidator,

	// Controller
	controller.update
);

/*
 * DELETE: Update category by ID
 * */
categoryRouter.delete(
	ROUTER_BOOK.CATEGORY.BY_ID,

	// Validation
	idValidator,

	// Controller
	controller.delete
);

export { categoryRouter };
