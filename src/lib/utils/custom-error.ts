import { ValidationError } from 'ajv';
import {
	EntityNotFoundError,
	FindRelationsNotFoundError,
	TypeORMError,
} from 'typeorm';

export type CustomErrorType =
	| 'AUTHORIZATION_ERROR'
	| 'VALIDATION_ERROR'
	| 'NOT_FOUND'
	| 'DB_ERROR'
	| 'JS_ERROR'
	| 'UNKNOWN_ERROR';

export interface CustomErrorPayload {
	type: CustomErrorType;
	message: string;
}

export class CustomError implements CustomErrorPayload {
	type: CustomErrorType;
	message: string;

	constructor({ message, type }: CustomErrorPayload) {
		this.type = type;
		this.message = message;
	}
}

export const processAndCreateCustomError = (error: unknown): CustomError => {
	if (
		error instanceof EntityNotFoundError ||
		error instanceof FindRelationsNotFoundError
	) {
		return new CustomError({
			type: 'NOT_FOUND',
			message: error.message,
		});
	}

	if (error instanceof TypeORMError) {
		return new CustomError({
			type: 'DB_ERROR',
			message: error.message,
		});
	}

	if (error instanceof ValidationError) {
		return new CustomError({
			type: 'VALIDATION_ERROR',
			message: error.errors?.at(0)?.message || 'Not valid data',
		});
	}

	if (error instanceof Error) {
		return new CustomError({
			type: 'JS_ERROR',
			message: error.message,
		});
	}

	return new CustomError({
		type: 'UNKNOWN_ERROR',
		message: 'Internal server error',
	});
};
