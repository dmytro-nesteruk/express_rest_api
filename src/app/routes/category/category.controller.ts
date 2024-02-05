import { RequestHandler } from 'express';

import { getPaginationFromQuery } from '@lib/utils';

import { CategoryService } from './category.service';

export class CategoryController {
	private readonly service: CategoryService;

	constructor() {
		this.service = new CategoryService();
	}

	public getList: RequestHandler = async (req, res) => {
		const pagination = getPaginationFromQuery(req);

		console.log({ pagination });

		try {
			const data = await this.service.getMany(pagination);

			console.log({ data });

			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({ message: 'Something went wrong' });
		}
	};

	public getById: RequestHandler = async (req, res) => {
		const id = Number(req.params.id);

		try {
			const data = await this.service.getById(id);

			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({ message: 'Something went wrong' });
		}
	};
}
