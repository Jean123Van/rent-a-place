import { IsEmail, IsNotEmpty } from 'class-validator';

export class SigninVendorData {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
