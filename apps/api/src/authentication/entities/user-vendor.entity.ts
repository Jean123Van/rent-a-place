import { Booking } from 'src/products/entities/bookings.entity';
import { Product } from 'src/products/entities/products.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    CreateDateColumn,
    Unique,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { UserImage } from './user-image.entity';

@Entity()
@Unique('UQ_email', ['email'])
@Unique('UQ_username', ['username'])
export class UserVendor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Product, (product) => product.vendor)
    products: Product[];

    @OneToMany(() => Booking, (booking) => booking.vendor)
    booking: Booking[];

    @JoinColumn()
    @OneToOne(() => UserImage, (userImg) => userImg.user, { cascade: true })
    userImg: UserImage;
}
