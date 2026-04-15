import { Injectable } from '@nestjs/common';
import { CreateProductData } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    createProduct(createProductData: CreateProductData, userId: string) {
        return this.productRepository.save({
            ...createProductData,
            vendor: { id: userId },
        });
    }
}
