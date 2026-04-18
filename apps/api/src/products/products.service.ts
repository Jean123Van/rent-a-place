import { Injectable } from '@nestjs/common';
import { CreateProductData } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { Repository } from 'typeorm';
import { UserVendor } from 'src/authentication/entities/user-vendor.entity';
import { BookProductData } from './dto/book-product.dto';
import { Booking } from './entities/bookings.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(UserVendor)
        private userVendorRepository: Repository<UserVendor>,
        @InjectRepository(Booking)
        private bookingRepository: Repository<Booking>,
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

    bookProduct(userId: string, bookProductInput: BookProductData) {
        const { productId, vendorId, ...rest } = bookProductInput;

        return this.bookingRepository.save({
            ...rest,
            customer: { id: userId },
            vendor: { id: vendorId },
            product: { id: productId },
        });
    }

    getUserBookingsByVendor(vendorId: string, userId: string) {
        return this.bookingRepository.find({
            where: { vendor: { id: vendorId }, customer: { id: userId } },
            order: { createdAt: 'DESC' },
        });
    }
}
