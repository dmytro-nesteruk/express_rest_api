import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { configService } from '@services';

import { Category, Photo, Product, User } from './entities';

export const db = new DataSource({
	type: 'postgres',
	host: configService.dbHost,
	port: configService.dbPort,
	username: configService.dbUserName,
	password: configService.dbUserPassword,
	database: configService.dbName,
	entities: [Product, Category, Photo, User],
	synchronize: true,
	logging: false,
});

db.initialize()
	.then(() => {
		console.log('DB INITED');
	})
	.catch((error) => console.log('DB INITIALIZATION: ', error));
