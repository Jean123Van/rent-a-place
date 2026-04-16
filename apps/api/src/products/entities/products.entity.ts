import { UserVendor } from 'src/authentication/entities/user-vendor.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    title: string;

    @Column()
    rate: number;

    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => UserVendor, (vendor) => vendor.products, {
        onDelete: 'CASCADE',
    })
    vendor: UserVendor;
}
