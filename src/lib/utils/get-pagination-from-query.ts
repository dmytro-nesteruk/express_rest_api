import { Request } from 'express';

export const getPaginationFromQuery = (req: Request) => {
	const page = req.query.page ? Number(req.query.page) : 1;
	const limit = req.query.limit ? Number(req.query.limit) : 10;

	return {
		page,
		limit,
	};
};
