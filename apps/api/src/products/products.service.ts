import { Injectable } from '@nestjs/common';
import { CreateProductData } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { Repository } from 'typeorm';
import { UserVendor } from 'src/authentication/entities/user-vendor.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(UserVendor)
        private userVendorRepository: Repository<UserVendor>,
    ) {}

    createProduct(createProductData: CreateProductData, userId: string) {
        return this.productRepository.save({
            ...createProductData,
            vendor: { id: userId },
        });
    }

    getAllProducts(userId: string) {
        return this.productRepository.find({
            where: { vendor: { id: userId } },
            order: { createdAt: 'DESC' },
        });
    }

    getAllVendors() {
        return this.userVendorRepository.find({ order: { createdAt: 'DESC' } });
    }
}
