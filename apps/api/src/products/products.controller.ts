import {
    Controller,
    Post,
    Body,
    UseGuards,
    Request,
    Get,
    Param,
    UploadedFiles,
    UseInterceptors,
    Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductData } from './dto/create-product.dto';
import { VendorAuthGuard } from 'src/authentication/guards/vendor-guard';
import { UserAuthGuard } from 'src/authentication/guards/user-guard';
import { BookProductData } from './dto/book-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Pagination } from './dto/pagination.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post('/create')
    @UseInterceptors(FilesInterceptor('files', 5, { storage: memoryStorage() }))
    @UseGuards(VendorAuthGuard)
    createProduct(
        @UploadedFiles() files: Express.Multer.File[],
        @Body() createProductData: CreateProductData,
        @Request() req,
    ) {
        return this.productsService.createProduct(
            createProductData,
            req.user.id,
            files,
        );
    }

    @Get('/find-all')
    @UseGuards(VendorAuthGuard)
    getAllProducts(@Request() req, @Query() pagination: Pagination) {
        return this.productsService.getAllProducts(
            req.user.id,
            pagination.page,
        );
    }

    @Post('/book')
    @UseGuards(UserAuthGuard)
    bookProduct(@Body() bookProductInput: BookProductData, @Request() req) {
        return this.productsService.bookProduct(req.user.id, bookProductInput);
    }

    @Get('/find-all/vendors')
    @UseGuards(UserAuthGuard)
    getAllVendors() {
        return this.productsService.getAllVendors();
    }

    @Get('/vendor/:vendorId')
    @UseGuards(UserAuthGuard)
    getProductsByVendor(@Param('vendorId') vendorId: string) {
        return this.productsService.getAllProducts(vendorId);
    }

    @Get('/bookings/customer')
    @UseGuards(UserAuthGuard)
    getBookingsByCustomer(@Request() req) {
        return this.productsService.getBookingsByCustomer(req.user.id);
    }

    @Get('/bookings/vendor')
    @UseGuards(VendorAuthGuard)
    getBookingsByVendor(@Request() req) {
        return this.productsService.getBookingsByVendor(req.user.id);
    }
}
