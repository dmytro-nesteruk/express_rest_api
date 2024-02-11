import { Repository } from 'typeorm';

import { Category, db } from '@db';

import { RequestPagination } from '@lib/schemes';
import { processAndCreateCustomError } from '@lib/utils';

interface CategoryWithProductsCount extends Category {
	productsCount: number;
}

export class CategoryService {
	private readonly repository: Repository<Category>;

	constructor() {
		this.repository = db.getRepository(Category);
	}

	public async getMany({ page, limit }: Required<RequestPagination>) {
		const skip = (page - 1) * limit;

		try {
			const { 0: data, 1: count } = await this.repository.findAndCount({
				skip,
				take: limit,
			});

			return {
				data,
				pagination: {
					page,
					limit,
					count,
				},
			};
		} catch (error) {
			throw processAndCreateCustomError(error);
		}
	}

	public async getById(id: Category['id']) {
		try {
			const data = await this.repository.findOneOrFail({
				where: {
					id,
				},
			});

			return data;
		} catch (error) {
			throw processAndCreateCustomError(error);
		}
	}

	public async getByIdWithProducts({
		id,
		page,
		limit,
	}: Required<RequestPagination & { id: Category['id'] }>) {
		try {
			const offset = (page - 1) * limit;

			const qb = this.repository.createQueryBuilder('c');

			const data = await qb
				.where('c.id = :id', { id })
				.leftJoin('c.products', 'p')
				.addSelect(['p.id', 'p.price', 'p.title', 'p.createDate'])
				.limit(limit)
				.offset(offset)
				.leftJoinAndSelect('p.mainPhoto', 'mph')
				.getOneOrFail();

			const { productsCount: count } = (await qb
				.loadRelationCountAndMap('c.productsCount', 'c.products')
				.where('c.id = :id', { id })
				.getOneOrFail()) as CategoryWithProductsCount;

			return {
				data,
				pagination: {
					page,
					limit,
					count,
				},
			};
		} catch (error) {
			throw processAndCreateCustomError(error);
		}
	}

	public async create(body: Partial<Category>) {
		const category = this.repository.create(body);

		try {
			const { 0: data } = await this.repository.save([category]);

			return data;
		} catch (error) {
			throw processAndCreateCustomError(error);
		}
	}

	public async update({
		id,
		body,
	}: {
		id: Category['id'];
		body: Partial<Category>;
	}) {
		const qb = this.repository.createQueryBuilder();

		try {
			const { raw } = await qb
				.update()
				.set(body)
				.where('id = :id', { id })
				.returning(['id', 'title', 'createDate'])
				.execute();

			return raw[0];
		} catch (error) {
			throw processAndCreateCustomError(error);
		}
	}

	public async deleteById(id: Category['id']) {
		try {
			const data = await this.repository
				.createQueryBuilder()
				.delete()
				.where('id = :id', { id })
				.returning(['id', 'title', 'createDate'])
				.execute();

			return data.raw[0];
		} catch (error) {
			throw processAndCreateCustomError(error);
		}
	}
}
