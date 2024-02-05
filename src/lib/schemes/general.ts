import { Static, Type } from '@sinclair/typebox';

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

export type Limit = Static<typeof LimitSchema>;
export type Page = Static<typeof PageSchema>;
export type RequestPagination = Static<typeof RequestPaginationSchema>;
