import { Router } from 'express';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import * as swagger from 'swagger-ui-express';

import { ROUTER_BOOK } from '@lib/constants';

const swaggerRouter = Router();

export const createSwaggerRouter = ({
	apiSpec,
}: {
	apiSpec: OpenAPIV3.Document;
}) =>
	swaggerRouter.use(
		ROUTER_BOOK.DOCS.ROOT,
		swagger.serve,
		swagger.setup(apiSpec)
	);
