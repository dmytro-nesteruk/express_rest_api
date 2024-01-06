import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

	@Column('enum', {
		enum: Currency,
		default: Currency.UAH,
	})
	currency: Currency;

	@Column('timestamp', {
		default: () => 'CURRENT_TIMESTAMP',
	})
	createDate: string;

	@Column({
		length: 100,
	})
	title: string;

	@Column({
		length: 240,
	})
	description: string;

	@Column('text')
	mainPhoto: string;

	@Column('text', { array: true })
	photos: Array<string>;
}
