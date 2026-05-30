import { ConflictException, Injectable } from '@nestjs/common';
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

    async createProduct(
        createProductData: CreateProductData,
        userId: string,
        files: Express.Multer.File[],
    ) {
        const { rate, units, ...rest } = createProductData;

        const isTitleExists = await this.productRepository.findOne({
            where: { title: createProductData.title },
        });

        if (isTitleExists) {
            throw new ConflictException(
                'Title already in use. Please choose a different one',
            );
        }

        return this.productRepository.save({
            ...rest,
            rate: Number(rate),
            units: Number(units),
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
        return this.userVendorRepository
            .createQueryBuilder('vendor')
            .innerJoin('vendor.products', 'product')
            .distinct(true)
            .orderBy('vendor.createdAt', 'DESC')
            .getMany();
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

    getBookingsByCustomer(userId: string) {
        return this.bookingRepository.find({
            relations: ['vendor', 'product'],
            where: { customer: { id: userId } },
            order: { createdAt: 'DESC' },
        });
    }

    getBookingsByVendor(vendorId: string) {
        return this.bookingRepository.find({
            where: { vendor: { id: vendorId } },
            order: { createdAt: 'DESC' },
            relations: ['customer', 'product'],
        });
    }
}
