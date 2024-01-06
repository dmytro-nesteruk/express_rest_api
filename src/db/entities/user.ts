import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
	ADMIN = 'ADMIN',
	USER = 'USER',
}

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'enum',
		enum: UserRole,
	})
	role: UserRole;

	@Column({
		type: 'text',
		unique: true,
	})
	email: string;

	@Column({
		type: 'text',
	})
	password: string;
}
