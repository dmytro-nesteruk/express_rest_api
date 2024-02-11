import { Static, Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });

addFormats(ajv, ['uri']).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);

const CategorySchema = Type.Strict(
	Type.Object(
		{
			id: Type.Number(),
			title: Type.String({ default: 'Some title' }),
			createDate: Type.String({ default: new Date().toISOString() }),
		},
		{ additionalProperties: false }
	)
);

const CategoryWithProductsSchema = Type.Strict(
	Type.Object(
		{
			id: Type.Number(),
			title: Type.String({ default: 'Some title' }),
			createDate: Type.String({ default: new Date().toISOString() }),
			products: Type.Array(
				Type.Object({
					id: Type.Number(),
					price: Type.Number({ default: 100 }),
					createDate: Type.String({ default: new Date().toISOString() }),
					title: Type.String({ default: 'Some title' }),
					mainPhoto: Type.Union(
						[
							Type.Null(),
							Type.String({ default: 'http://example.com', format: 'uri' }),
						],
						{ default: 'http://example.com' }
					),
				})
			),
		},
		{ additionalProperties: false }
	)
);

const CreateOrUpdateCategoryPayloadSchema = Type.Strict(
	Type.Object(
		{
			title: Type.String({
				default: 'Some title',
				errorMessage: {
					type: '${0#} must be a string',
				},
			}),
		},
		{ additionalProperties: false }
	)
);

const GetCategiesListResponseSchema = Type.Strict(
	Type.Object({
		data: Type.Array(CategorySchema),
		pagination: Type.Object(
			{
				limit: Type.Number({ default: 10 }),
				page: Type.Number({ default: 1 }),
			},
			{ additionalProperties: false }
		),
	})
);

const GetCategoryWithProductsResponseSchema = Type.Strict(
	Type.Object({
		data: CategoryWithProductsSchema,
		pagination: Type.Object(
			{
				limit: Type.Number({ default: 10 }),
				page: Type.Number({ default: 1 }),
			},
			{ additionalProperties: false }
		),
	})
);

type Category = Static<typeof CategorySchema>;
type GetCategiesListResponse = Static<typeof GetCategiesListResponseSchema>;

export {
	CategorySchema,
	CreateOrUpdateCategoryPayloadSchema,
	GetCategiesListResponseSchema,
	GetCategoryWithProductsResponseSchema,
	GetCategiesListResponse,
	Category,
};
