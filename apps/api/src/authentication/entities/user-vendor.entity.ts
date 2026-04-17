import { Product } from 'src/products/entities/products.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    CreateDateColumn,
} from 'typeorm';

@Entity()
export class UserVendor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Product, (product) => product.vendor)
    products: Product[];
}
