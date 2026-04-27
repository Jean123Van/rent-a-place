import { UserCustomer } from 'src/authentication/entities/user-customer.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './products.entity';
import { UserVendor } from 'src/authentication/entities/user-vendor.entity';

@Entity()
export class Booking {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    additionalNote: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => UserCustomer, (customer) => customer.booking)
    customer: UserCustomer;

    @ManyToOne(() => Product, (product) => product.booking)
    product: Product;

    @ManyToOne(() => UserVendor, (vendor) => vendor.booking)
    vendor: UserVendor;
}
