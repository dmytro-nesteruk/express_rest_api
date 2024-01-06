import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { Category } from './category';
import { Photo } from './photo';

export enum Currency {
	'UAH' = 'UAH',
	'USD' = 'USD',
	'EUR' = 'EUR',
}

@Entity()
export class Product {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'numeric',
		transformer: {
			to(value) {
				return value;
			},
			from(value) {
				return Number(value);
			},
		},
	})
	price: number;

	@Column({
		type: 'enum',
		enum: Currency,
		default: Currency.UAH,
	})
	currency: Currency;

	@Column({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createDate: string;

	@Column({
		type: 'text',
	})
	title: string;

	@Column({
		type: 'text',
	})
	description: string;

	@OneToOne(() => Photo, (photo) => photo.product)
	mainPhoto: Photo;

	@OneToMany(() => Photo, (photo) => photo.product)
	photos: Array<Photo>;

	@ManyToOne(() => Category, (category) => category.products)
	category: Category;
}
