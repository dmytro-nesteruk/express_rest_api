import { Router } from 'express';

import { paginationValidator } from '@middlewares';

import { ROUTER_BOOK } from '@lib/constants';

import { CategoryController } from './category.controller';

const categoryRouter = Router();

const controller = new CategoryController();

categoryRouter.get(
	ROUTER_BOOK.CATEGORY.ROOT,

	// Validation
	paginationValidator,

	// Controller
	controller.getList
);

categoryRouter.get(
	ROUTER_BOOK.CATEGORY.BY_ID,

	// Controller
	controller.getById
);

export { categoryRouter };
