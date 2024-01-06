import { config } from 'dotenv';

config();

export class ConfigService {
	// App configuration
	readonly port = Number(process.env.APP_PORT);

	// Database configuration
	readonly dbPort = Number(process.env.DB_PORT);
	readonly dbHost = process.env.DB_HOST as string;
	readonly dbName = process.env.DB_NAME as string;
	readonly dbUserName = process.env.DB_USER_NAME as string;
	readonly dbUserPassword = process.env.DB_USER_PASSWORD as string;

	// JWT Secrets
	readonly accessSecret = process.env.ACCESS_SECRET as string;
	readonly refresh = process.env.REFRESH_SECRET as string;
}

export const configService = new ConfigService();
