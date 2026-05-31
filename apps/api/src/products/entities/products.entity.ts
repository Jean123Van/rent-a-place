import { UserVendor } from 'src/authentication/entities/user-vendor.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';
import { Booking } from './bookings.entity';
import { ProductImage } from './product-image.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    title: string;

    @Column()
    rate: number;

    @Column()
    units: number;

    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => UserVendor, (vendor) => vendor.products, {
        onDelete: 'CASCADE',
    })
    vendor: UserVendor;

    @OneToMany(() => Booking, (booking) => booking.product)
    booking: Booking[];

    @OneToMany(() => ProductImage, (productImage) => productImage.product, {
        cascade: true,
    })
    productImage: ProductImage[];
}
