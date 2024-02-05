import { Static, Type } from '@sinclair/typebox';

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

type Category = Static<typeof CategorySchema>;
type GetCategiesListResponse = Static<typeof GetCategiesListResponseSchema>;

export {
	CategorySchema,
	GetCategiesListResponseSchema,
	Category,
	GetCategiesListResponse,
};
