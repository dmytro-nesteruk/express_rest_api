import { Router } from 'express';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';

import { categoryRouter, getCategorySwagger } from './category';

const router = Router();

router.use(categoryRouter);

export const swaggerPaths: OpenAPIV3.PathsObject = {
	...getCategorySwagger(['Category']),
};

export { router };
