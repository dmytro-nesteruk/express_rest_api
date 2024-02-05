import { Router } from 'express';
import * as swagger from 'swagger-ui-express';

import { ROUTER_BOOK } from '@lib/constants';

import { apiSpec } from './api';

const swaggerRouter = Router();

swaggerRouter.use(ROUTER_BOOK.DOCS.ROOT, swagger.serve, swagger.setup(apiSpec));

export { swaggerRouter };
