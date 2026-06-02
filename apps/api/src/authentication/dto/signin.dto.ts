import { IsNotEmpty } from 'class-validator';

export class SigninData {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
