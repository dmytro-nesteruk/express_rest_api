import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from './product';

@Entity()
export class Photo {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'text',
	})
	url: string;

	@ManyToOne(() => Product, (product) => product.photos, {
		onDelete: 'SET NULL',
		cascade: ['insert', 'update'],
	})
	product: Product;
}
