import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Product } from './products.entity';

@Entity()
export class ProductImage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fileName: string;

    @Column()
    bucket: string;

    @ManyToOne(() => Product, (product) => product.productImage, {
        onDelete: 'CASCADE',
    })
    product: Product;
}
