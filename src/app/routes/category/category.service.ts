import { Repository } from 'typeorm';

import { Category, db } from '@db';

import { RequestPagination } from '@lib/schemes';

export class CategoryService {
	private readonly repository: Repository<Category>;

	constructor() {
		this.repository = db.getRepository(Category);
	}

	public async getMany({ page, limit }: Required<RequestPagination>) {
		const offset = (page - 1) * limit;

		try {
			const { 0: data, 1: count } = await this.repository
				.createQueryBuilder('category')
				.offset(offset)
				.limit(limit)
				.getManyAndCount();

			return {
				data,
				pagination: {
					page,
					limit,
					count,
				},
			};
		} catch (error) {
			console.log(error);
		}
	}

	public async getById(id: Category['id']) {
		try {
			const data = await this.repository
				.createQueryBuilder('category')
				.where('category.id = :id', { id })
				.getOneOrFail();

			return data;
		} catch (error) {
			console.log(error);
		}
	}
}
