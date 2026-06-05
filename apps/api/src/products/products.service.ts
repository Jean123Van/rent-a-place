import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductData } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { Repository } from 'typeorm';
import { UserVendor } from 'src/authentication/entities/user-vendor.entity';
import { BookProductData } from './dto/book-product.dto';
import { Booking } from './entities/bookings.entity';
import { MinioService } from 'src/minio/minio.service';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(UserVendor)
        private userVendorRepository: Repository<UserVendor>,
        @InjectRepository(Booking)
        private bookingRepository: Repository<Booking>,
        private minioService: MinioService,
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

        const productImageData = await this.minioService.uploadFiles(
            'product-image',
            files,
        );

        return this.productRepository.save({
            ...rest,
            rate: Number(rate),
            units: Number(units),
            vendor: { id: userId },
            productImage: productImageData,
        });
    }

    async getAllProducts(userId: string) {
        const products = await this.productRepository.find({
            where: { vendor: { id: userId } },
            order: { createdAt: 'DESC' },
            relations: {
                productImage: true,
            },
        });

        return products.map((product) => {
            const images = this.minioService.getPublicUrls(
                product.productImage,
            );

            return { ...product, productImage: images };
        });
    }

    async getAllVendors() {
        const vendors = await this.userVendorRepository
            .createQueryBuilder('vendor')
            .innerJoin('vendor.products', 'product')
            .leftJoinAndSelect('vendor.userImg', 'userImg')
            .distinct(true)
            .orderBy('vendor.createdAt', 'DESC')
            .getMany();

        return vendors.map((vendor) => {
            return {
                email: vendor.email,
                id: vendor.id,
                username: vendor.username,
                userImg: vendor.userImg
                    ? this.minioService.getPublicUrl(
                          vendor.userImg.bucket,
                          vendor.userImg.fileName,
                      )
                    : undefined,
            };
        });
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

    async getBookingsByCustomer(userId: string) {
        const bookings = await this.bookingRepository.find({
            relations: ['vendor', 'product', 'product.productImage'],
            where: { customer: { id: userId } },
            order: { createdAt: 'DESC' },
        });

        return bookings.map((booking) => {
            const product = booking.product;
            const newImages = this.minioService.getPublicUrls(
                product.productImage,
            );

            return {
                ...booking,
                product: { ...product, productImage: newImages },
            };
        });
    }

    async getBookingsByVendor(vendorId: string) {
        const bookings = await this.bookingRepository.find({
            where: { vendor: { id: vendorId } },
            order: { createdAt: 'DESC' },
            relations: ['customer', 'product', 'product.productImage'],
        });

        return bookings.map((booking) => {
            const product = booking.product;

            const newImages = this.minioService.getPublicUrls(
                product.productImage,
            );

            return {
                ...booking,
                product: { ...product, productImage: newImages },
            };
        });
    }
}
