import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class BookProductData {
    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;

    @IsOptional()
    additionalNote: string;

    @IsNotEmpty()
    productId: string;

    @IsNotEmpty()
    vendorId: string;
}
