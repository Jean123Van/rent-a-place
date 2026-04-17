import { IsEmail, IsNotEmpty } from 'class-validator';

export class SigninData {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
