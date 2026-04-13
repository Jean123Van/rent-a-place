import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupVendorData } from './dto/signup-vendor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserVendor } from './entities/authentication.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SigninVendorData } from './dto/signin-vendor.dto';
import { JwtService } from '@nestjs/jwt';
import { UserTypes } from 'src/utils/types/user-types';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectRepository(UserVendor)
        private userVendorRepository: Repository<UserVendor>,
        private jwtService: JwtService,
    ) {}

    async signupVendor(signupVendorData: SignupVendorData) {
        const { password, ...rest } = signupVendorData;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        return this.userVendorRepository.save({
            ...rest,
            password: hashedPassword,
        });
    }

    async signinVendor(signinVendorData: SigninVendorData) {
        const { email, password } = signinVendorData;

        const vendor = await this.userVendorRepository.findOne({
            where: { email },
        });

        if (!vendor) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, vendor.password);

        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            id: vendor.id,
            type: UserTypes.VENDOR,
        };

        const token = this.jwtService.sign(payload, {
            secret: 'vendor-secret',
        });

        return {
            access_token: token,
        };
    }
}
