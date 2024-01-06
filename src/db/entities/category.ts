import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from './product';

@Entity()
export class Category {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'text',
	})
	title: string;

	@Column({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createDate: string;

	@OneToMany(() => Product, (product) => product.category)
	products: Product[];
}
