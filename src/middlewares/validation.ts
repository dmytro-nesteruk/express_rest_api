import { TAnySchema, Type } from '@sinclair/typebox';
import Ajv, { ValidateFunction } from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import { RequestHandler } from 'express';

import { QUERY_KEYS } from '@lib/constants';
import { IdSchema, RequestPaginationSchema } from '@lib/schemes';

const ajv = new Ajv({ allErrors: true });

addFormats(ajv, ['email', 'time', 'uri'])
	.addKeyword('kind')
	.addKeyword('modifier');
addErrors(ajv);

const VALIDATION_ERROR_CODE = 400 as const;

const getErrorMessage = (validate: ValidateFunction) => {
	const additionalProperty =
		validate?.errors?.at(0)?.params?.additionalProperty;

	return additionalProperty
		? `"${additionalProperty}" is not supported"`
		: validate?.errors?.at(0)?.message;
};

const createBodyValidator = (schema: TAnySchema) => {
	const validate = ajv.compile(schema);

	const mw: RequestHandler = (req, res, next) => {
		const isValid = validate(req.body);

		if (!isValid) {
			const message = getErrorMessage(validate);

			res.status(400).json({ code: VALIDATION_ERROR_CODE, message });
			return;
		}

		next();
	};

	return mw;
};

const createPaginationValidator = () => {
	const validate = ajv.compile(RequestPaginationSchema);

	const mw: RequestHandler = (req, res, next) => {
		const validationObject = {
			page: req.query[QUERY_KEYS.PAGE] && Number(req.query[QUERY_KEYS.PAGE]),
			limit: req.query[QUERY_KEYS.LIMIT] && Number(req.query[QUERY_KEYS.LIMIT]),
		};

		const isValid = validate(validationObject);

		if (!isValid) {
			const message = getErrorMessage(validate);

			res.status(400).json({ code: VALIDATION_ERROR_CODE, message });
			return;
		}

		next();
	};

	return mw;
};

const createIdValidator = (key = 'id') => {
	const validate = ajv.compile(Type.Object({ id: IdSchema }));

	const mw: RequestHandler = (req, res, next) => {
		const id = Number(req.params[key]);

		const isValid = validate({ id });

		if (!isValid) {
			const message = getErrorMessage(validate);

			res.status(400).json({ code: VALIDATION_ERROR_CODE, message });
			return;
		}

		next();
	};

	return mw;
};

const paginationValidator = createPaginationValidator();

const idValidator = createIdValidator();

export {
	paginationValidator,
	idValidator,
	createIdValidator,
	createBodyValidator,
};
