import { UserVendor } from 'src/authentication/entities/authentication.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

    @Column({ type: 'date' })
    startDate: Date;

    @Column({ type: 'date' })
    endDate: Date;

    @ManyToOne(() => UserVendor, (vendor) => vendor.products, {
        onDelete: 'CASCADE',
    })
    vendor: UserVendor;
}
