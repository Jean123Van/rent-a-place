import {
    Controller,
    Post,
    Body,
    UseGuards,
    Request,
    Get,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductData } from './dto/create-product.dto';
import { VendorAuthGuard } from 'src/authentication/guards/vendor-guard';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post('/create')
    @UseGuards(VendorAuthGuard)
    createProduct(
        @Body() createProductData: CreateProductData,
        @Request() req,
    ) {
        return this.productsService.createProduct(
            createProductData,
            req.user.id,
        );
    }

    @Get('/find-all')
    @UseGuards(VendorAuthGuard)
    getAllProducts(@Request() req) {
        return this.productsService.getAllProducts(req.user.id);
    }
}
