import {
    Body,
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignupVendorData } from './dto/signup-vendor.dto';
import { SigninVendorData } from './dto/signin-vendor.dto';
import { SignupData } from './dto/signup.dto';
import { SigninData } from './dto/signin.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
    ) {}

    @UseInterceptors(FileInterceptor('file'))
    @Post('/signup/vendor')
    signupVendor(
        @Body() signupVendorData: SignupVendorData,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.authenticationService.signupVendor(signupVendorData, file);
    }

    @Post('/signin/vendor')
    signinVendor(@Body() signinVendorData: SigninVendorData) {
        return this.authenticationService.signinVendor(signinVendorData);
    }

    @Post('/signup')
    signup(@Body() signupData: SignupData) {
        return this.authenticationService.signup(signupData);
    }

    @Post('/signin')
    signin(@Body() signinData: SigninData) {
        return this.authenticationService.signin(signinData);
    }
}
