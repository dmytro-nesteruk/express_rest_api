import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { handleError } from '@middlewares';

import { ROUTER_BOOK } from '@lib/constants';

import { swaggerPaths as paths, router } from './routes';
import { createSwaggerRouter, getApiSpec } from './swagger';

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(ROUTER_BOOK.API_PREFIX, router);
router.use(createSwaggerRouter({ apiSpec: getApiSpec(paths) }));

app.use(handleError);

export { app };
