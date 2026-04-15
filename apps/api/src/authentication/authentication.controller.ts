import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignupVendorData } from './dto/signup-vendor.dto';
import { SigninVendorData } from './dto/signin-vendor.dto';

@Controller('auth')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
    ) {}

    @Post('/signup/vendor')
    signupVendor(@Body() signupVendorData: SignupVendorData) {
        return this.authenticationService.signupVendor(signupVendorData);
    }

    @Post('/signin/vendor')
    signinVendor(@Body() signinVendorData: SigninVendorData) {
        return this.authenticationService.signinVendor(signinVendorData);
    }
}
