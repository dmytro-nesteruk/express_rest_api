import { RequestHandler } from 'express';

import { Category } from '@db';

import { getPaginationFromQuery } from '@lib/utils';

import { CategoryService } from './category.service';

export class CategoryController {
	private readonly service: CategoryService;

	constructor() {
		this.service = new CategoryService();
	}

	public getList: RequestHandler = async (req, res, next) => {
		const pagination = getPaginationFromQuery(req);

		try {
			const data = await this.service.getMany(pagination);

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	};

	public getById: RequestHandler = async (req, res, next) => {
		const id = Number(req.params.id);

		try {
			const data = await this.service.getById(id);

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	};

	public getByIdWithProducts: RequestHandler = async (req, res, next) => {
		const id = Number(req.params.id);

		const pagination = getPaginationFromQuery(req);

		try {
			const data = await this.service.getByIdWithProducts({
				id,
				...pagination,
			});

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	};

	public create: RequestHandler = async (req, res, next) => {
		const body = req.body as Partial<Category>;

		try {
			const data = await this.service.create(body);

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	};

	public update: RequestHandler = async (req, res, next) => {
		const id = Number(req.params.id);
		const body = req.body;

		try {
			await this.service.getById(id);
		} catch (error) {
			next(error);
		}

		try {
			const data = await this.service.update({ id, body });

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	};

	public delete: RequestHandler = async (req, res, next) => {
		const id = Number(req.params.id);

		try {
			await this.service.getById(id);
		} catch (error) {
			next(error);
		}

		try {
			const data = await this.service.deleteById(id);

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	};
}
