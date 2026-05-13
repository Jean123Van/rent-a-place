import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductData {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    rate: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    units: string;
}
