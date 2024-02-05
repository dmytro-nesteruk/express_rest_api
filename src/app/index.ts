import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { ROUTER_BOOK } from '@lib/constants';

import { router } from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

app.use(ROUTER_BOOK.API_PREFIX, router);

export { app };
