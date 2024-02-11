import { Static, Type } from '@sinclair/typebox';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';

import { QUERY_KEYS } from '@lib/constants';

export const LimitSchema = Type.Optional(
	Type.Strict(
		Type.Number({
			title: QUERY_KEYS.LIMIT,
			minimum: 10,
			maximum: 50,
			errorMessage: {
				type: '${0#} must be a number',
				minimum: '${0#} must be greater or equel to 10',
				maximum: '${0#} must be smaller or equel to 50',
			},
		})
	)
);

export const PageSchema = Type.Optional(
	Type.Strict(
		Type.Number({
			title: QUERY_KEYS.PAGE,
			minimum: 1,
			errorMessage: {
				type: '${0#} must be a number',
				minimum: '${0#} must be greater or equel to 1',
			},
		})
	)
);

export const IdSchema = Type.Optional(
	Type.Strict(
		Type.Number({
			title: QUERY_KEYS.ID,
			minimum: 1,
			errorMessage: {
				type: '${0#} must be a number',
				minimum: '${0#} must be greater or equel to 1',
			},
		})
	)
);

export const RequestPaginationSchema = Type.Optional(
	Type.Strict(
		Type.Object({
			[QUERY_KEYS.PAGE]: PageSchema,
			[QUERY_KEYS.LIMIT]: LimitSchema,
		})
	)
);

export const NotFoundErrorSchema = Type.Strict(
	Type.Object(
		{
			code: Type.Number({ default: 404 }),
			message: Type.String({ default: 'Not found' }),
		},
		{ additionalProperties: false }
	)
);

export const UnauthorizedErrorSchema = Type.Strict(
	Type.Object(
		{
			code: Type.Number({ default: 401 }),
			message: Type.String({ default: 'Unauthorized' }),
		},
		{ additionalProperties: false }
	)
);

export const InternalServerErrorSchema = Type.Strict(
	Type.Object(
		{
			code: Type.Number({ default: 500 }),
			message: Type.String({ default: 'Internal server error' }),
		},
		{ additionalProperties: false }
	)
);

export const ClientErrorSchema = Type.Strict(
	Type.Object(
		{
			code: Type.Number({ default: 400 }),
			message: Type.String({ default: 'Some client error' }),
		},
		{ additionalProperties: false }
	)
);

export const postRequestErrorResponses: OpenAPIV3.ResponsesObject = {
	400: {
		description: 'Client error',
		content: {
			'application/json': {
				schema: ClientErrorSchema,
			},
		},
	},
	401: {
		description: 'Unauthorized',
		content: {
			'application/json': {
				schema: UnauthorizedErrorSchema,
			},
		},
	},
	500: {
		description: 'Internal server error',
		content: {
			'application/json': {
				schema: InternalServerErrorSchema,
			},
		},
	},
} as const;

export const allErrorResponses: OpenAPIV3.ResponsesObject = {
	400: {
		description: 'Client error',
		content: {
			'application/json': {
				schema: ClientErrorSchema,
			},
		},
	},
	401: {
		description: 'Unauthorized',
		content: {
			'application/json': {
				schema: UnauthorizedErrorSchema,
			},
		},
	},
	404: {
		description: 'Not found',
		content: {
			'application/json': {
				schema: NotFoundErrorSchema,
			},
		},
	},
	500: {
		description: 'Internal server error',
		content: {
			'application/json': {
				schema: InternalServerErrorSchema,
			},
		},
	},
} as const;

export const getRequestErrorResponses: OpenAPIV3.ResponsesObject = {
	400: {
		description: 'Client error',
		content: {
			'application/json': {
				schema: ClientErrorSchema,
			},
		},
	},
	404: {
		description: 'Not found',
		content: {
			'application/json': {
				schema: NotFoundErrorSchema,
			},
		},
	},
	500: {
		description: 'Internal server error',
		content: {
			'application/json': {
				schema: InternalServerErrorSchema,
			},
		},
	},
} as const;

export type Limit = Static<typeof LimitSchema>;
export type Page = Static<typeof PageSchema>;
export type RequestPagination = Static<typeof RequestPaginationSchema>;
export type NotFoundError = Static<typeof NotFoundErrorSchema>;
export type InternalServerError = Static<typeof InternalServerErrorSchema>;
export type UnauthorizedError = Static<typeof UnauthorizedErrorSchema>;
export type ClientError = Static<typeof ClientErrorSchema>;
