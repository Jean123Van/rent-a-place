import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserVendor } from './authentication/entities/user-vendor.entity';
import { Product } from './products/entities/products.entity';
import { ProductsModule } from './products/products.module';
import { UserCustomer } from './authentication/entities/user-customer.entity';
import { Booking } from './products/entities/bookings.entity';
import { ProductImage } from './products/entities/product-image.entity';
import { MinioModule } from './minio/minio.module';
import { UserImage } from './authentication/entities/user-image.entity';

@Module({
    imports: [
        AuthenticationModule,
        MinioModule,
        ProductsModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 15432,
            username: 'postgres',
            password: 'jean',
            database: 'BookingService',
            entities: [
                UserVendor,
                Product,
                UserCustomer,
                Booking,
                ProductImage,
                UserImage,
            ],
            synchronize: true,
        }),
    ],
})
export class AppModule {}
