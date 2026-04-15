import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserVendor } from './authentication/entities/authentication.entity';
import { Product } from './products/entities/products.entity';
import { ProductsModule } from './products/products.module';

@Module({
    imports: [
        AuthenticationModule,
        ProductsModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 15432,
            username: 'postgres',
            password: 'jean',
            database: 'BookingService',
            entities: [UserVendor, Product],
            synchronize: true,
        }),
    ],
})
export class AppModule {}
