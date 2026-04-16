import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserCustomer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
}
