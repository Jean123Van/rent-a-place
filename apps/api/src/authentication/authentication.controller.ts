import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignupVendorData } from './dto/signup-vendor.dto';

@Controller('auth')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
    ) {}

    @Post('/signup/vendor')
    signupVendor(@Body() signupVendorData: SignupVendorData) {
        return this.authenticationService.signupVendor(signupVendorData);
    }
}
