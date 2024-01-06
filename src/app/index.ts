import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', async (_, res) => {
	res.status(200).json({ msg: 'Hello world' });
});

export { app };
