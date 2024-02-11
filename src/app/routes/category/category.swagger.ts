import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';

import { QUERY_KEYS, ROUTER_BOOK } from '@lib/constants';
import {
	IdSchema,
	LimitSchema,
	PageSchema,
	allErrorResponses,
	getRequestErrorResponses,
	postRequestErrorResponses,
} from '@lib/schemes';

import {
	CategorySchema,
	CreateOrUpdateCategoryPayloadSchema,
	GetCategiesListResponseSchema,
	GetCategoryWithProductsResponseSchema,
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
					schema: LimitSchema,
				},
				{
					name: QUERY_KEYS.PAGE,
					in: 'query',
					schema: PageSchema,
				},
			],
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: GetCategiesListResponseSchema,
						},
					},
				},
				...getRequestErrorResponses,
			},
		},

		post: {
			tags,
			summary: 'Create category',
			requestBody: {
				content: {
					'application/json': {
						schema: CreateOrUpdateCategoryPayloadSchema,
						required: true,
					},
				},
			},
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: CategorySchema,
						},
					},
				},
				...postRequestErrorResponses,
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
					schema: IdSchema,
					required: true,
				},
			],
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: CategorySchema,
						},
					},
				},
				...getRequestErrorResponses,
			},
		},
		put: {
			tags,
			summary: 'Update category by ID',
			parameters: [
				{
					name: QUERY_KEYS.ID,
					in: 'path',
					schema: IdSchema,
					required: true,
				},
			],
			requestBody: {
				content: {
					'application/json': {
						schema: CreateOrUpdateCategoryPayloadSchema,
					},
				},
			},
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: CategorySchema,
						},
					},
				},
				...allErrorResponses,
			},
		},
		delete: {
			tags,
			summary: 'Delete category by ID',
			parameters: [
				{
					name: QUERY_KEYS.ID,
					in: 'path',
					schema: IdSchema,
					required: true,
				},
			],
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: CategorySchema,
						},
					},
				},
				...allErrorResponses,
			},
		},
	},

	[`${ROUTER_BOOK.CATEGORY.ROOT}/{${QUERY_KEYS.ID}}/product`]: {
		get: {
			tags,
			summary: 'Get category by ID and related products',
			parameters: [
				{
					name: QUERY_KEYS.ID,
					in: 'path',
					schema: IdSchema,
					required: true,
				},
			],
			responses: {
				200: {
					description: 'Success',
					content: {
						'application/json': {
							schema: GetCategoryWithProductsResponseSchema,
						},
					},
				},
				...getRequestErrorResponses,
			},
		},
	},
});
