import { Router } from 'express';
import { swaggerRouter } from 'src/swagger';

import { categoryRouter } from './category';

const router = Router();

router.use(categoryRouter);
router.use(swaggerRouter);

export { router };
