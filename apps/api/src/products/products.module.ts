import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { UserVendor } from 'src/authentication/entities/user-vendor.entity';
import { Booking } from './entities/bookings.entity';
import { MinioService } from 'src/minio/minio.service';
import { ProductImage } from './entities/product-image.entity';
import { ProductAvailability } from './entities/product-availability';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product,
            UserVendor,
            Booking,
            ProductImage,
            ProductAvailability,
        ]),
    ],
    controllers: [ProductsController],
    providers: [ProductsService, MinioService],
})
export class ProductsModule {}
