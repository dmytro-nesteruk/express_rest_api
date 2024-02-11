import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';

type TagKeys = 'category';

const tagsObject = {
	category: {
		name: 'Category',
		description: 'Endpoints for "Category" entity',
	},
} as const as Record<TagKeys, OpenAPIV3.TagObject>;

const tags = Object.values(tagsObject);

export const getApiSpec = (
	paths: OpenAPIV3.PathsObject
): OpenAPIV3.Document => ({
	openapi: '3.0.0',
	info: {
		title: 'Express REST API',
		version: '1.0.0',
	},
	servers: [
		{
			url: 'http://localhost:3000/api/v1',
		},
	],
	tags,
	paths,
});
