import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { Category, Photo, Product, db } from '@db';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', async (_, res) => {
	const photoRepository = db.getRepository(Photo);
	const productRepository = db.getRepository(Product);
	const categoryRepository = db.getRepository(Category);

	const photo = await photoRepository.save({
		url: 'https://example.com',
	});

	const category = await categoryRepository.save({
		title: 'Some category',
	});

	const product = await productRepository.save({
		title: 'Some product',
		description: 'Some descr',
		price: 13,
		mainPhoto: photo,
		photos: [photo],
		category,
	});

	res.status(200).json(product);
});

export { app };
