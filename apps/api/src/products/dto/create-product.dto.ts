import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductData {
    @IsNotEmpty()
    title: string;

    @IsNumber()
    rate: number;

    @IsNotEmpty()
    description: string;
}
