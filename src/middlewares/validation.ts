import { TAnySchema } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import { RequestHandler } from 'express';

import { QUERY_KEYS } from '@lib/constants';
import { RequestPaginationSchema } from '@lib/schemes';

const ajv = new Ajv({ allErrors: true });

addFormats(ajv, ['email', 'time', 'uri'])
	.addKeyword('kind')
	.addKeyword('modifier');
addErrors(ajv);

const createBodyValidator = (schema: TAnySchema) => {
	const validate = ajv.compile(schema);

	const mw: RequestHandler = (req, res, next) => {
		const isValid = validate(req.body);

		if (!isValid) {
			res.status(400).json(validate.errors?.at(0));
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
			const message = validate?.errors?.at(0)?.message;

			res.status(400).json({ message });
			return;
		}

		next();
	};

	return mw;
};

const paginationValidator = createPaginationValidator();

export { paginationValidator, createBodyValidator };
