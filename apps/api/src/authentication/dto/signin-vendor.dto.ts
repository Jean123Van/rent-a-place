import { IsEmail, IsNotEmpty } from 'class-validator';

export class SigninVendorData {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
