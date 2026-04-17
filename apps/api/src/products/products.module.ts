import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { UserVendor } from 'src/authentication/entities/user-vendor.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product, UserVendor])],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}
