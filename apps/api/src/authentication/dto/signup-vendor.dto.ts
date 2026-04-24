import {
    IsEmail,
    IsNotEmpty,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class SignupVendorData {
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    username: string;

    @IsEmail()
    email: string;

    @Matches(/[A-Z]/, { message: 'Should have at least one capital letter' })
    @Matches(/[0-9]/, { message: 'Should have at least one number' })
    @Matches(/[^A-Za-z0-9]/, { message: 'Should have at least one symbol' })
    @MinLength(6)
    @MaxLength(20)
    password: string;
}
