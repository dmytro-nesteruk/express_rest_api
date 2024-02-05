import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';

import { QUERY_KEYS, ROUTER_BOOK } from '@lib/constants';
import { IdSchema, LimitSchema, PageSchema } from '@lib/schemes';

import {
	CategorySchema,
	GetCategiesListResponseSchema,
} from './category.schemes';

export const getCategorySwagger = (
	tags?: OpenAPIV3.OperationObject['tags']
): OpenAPIV3.PathsObject => ({
	[ROUTER_BOOK.CATEGORY.ROOT]: {
		get: {
			tags,
			summary: 'Get categories list',
			parameters: [
				{
					name: QUERY_KEYS.LIMIT,
					in: 'query',
					schema: LimitSchema as OpenAPIV3.SchemaObject,
				},
				{
					name: QUERY_KEYS.PAGE,
					in: 'query',
					schema: PageSchema as OpenAPIV3.SchemaObject,
				},
			],
			responses: {
				200: {
					description: 'Successful response',
					content: {
						'application/json': {
							schema: GetCategiesListResponseSchema as OpenAPIV3.SchemaObject,
						},
					},
				},
			},
		},
	},

	[`${ROUTER_BOOK.CATEGORY.ROOT}/{${QUERY_KEYS.ID}}`]: {
		get: {
			tags,
			summary: 'Get category by ID',
			parameters: [
				{
					name: QUERY_KEYS.ID,
					in: 'path',
					schema: IdSchema as OpenAPIV3.SchemaObject,
				},
			],
			responses: {
				200: {
					description: 'Successful response',
					content: {
						'application/json': {
							schema: CategorySchema as OpenAPIV3.SchemaObject,
						},
					},
				},
			},
		},
	},
});
