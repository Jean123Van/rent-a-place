import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupVendorData {
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;
}
