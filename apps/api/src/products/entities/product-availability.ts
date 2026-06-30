import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class ProductAvailability {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ type: Date })
    date: Date;

    @Column()
    productId: string;

    @Column()
    totalUnits: number;

    @Column()
    totalBookings: number;
}
