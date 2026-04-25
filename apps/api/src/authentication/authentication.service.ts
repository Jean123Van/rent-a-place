import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { SignupVendorData } from './dto/signup-vendor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserVendor } from './entities/user-vendor.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SigninVendorData } from './dto/signin-vendor.dto';
import { JwtService } from '@nestjs/jwt';
import { UserTypes } from 'src/utils/types/user-types';
import { SignupData } from './dto/signup.dto';
import { UserCustomer } from './entities/user-customer.entity';
import { SigninData } from './dto/signin.dto';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectRepository(UserVendor)
        private userVendorRepository: Repository<UserVendor>,
        @InjectRepository(UserCustomer)
        private userCustomerRepository: Repository<UserCustomer>,
        private jwtService: JwtService,
    ) {}

    async signupVendor(signupVendorData: SignupVendorData) {
        const { password, username, email, ...rest } = signupVendorData;

        const isEmaiExists = await this.userVendorRepository.findOne({
            where: { email },
        });
        const isUsernameExists = await this.userVendorRepository.findOne({
            where: { username },
        });

        if (isEmaiExists && isUsernameExists) {
            throw new ConflictException(
                'Email and username already in use. Use unique ones or login instead.',
            );
        }

        if (isUsernameExists) {
            throw new ConflictException(
                'Username already in use. Pick a different username.',
            );
        }

        if (isEmaiExists) {
            throw new ConflictException(
                'Email already in use. Use a different email or log in instead.',
            );
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        try {
            return await this.userVendorRepository.save({
                ...rest,
                password: hashedPassword,
            });
        } catch (e) {
            throw e;
        }
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

    async signup(signupData: SignupData) {
        const { password, ...rest } = signupData;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        return this.userCustomerRepository.save({
            ...rest,
            password: hashedPassword,
        });
    }

    async signin(signinData: SigninData) {
        const { email, password } = signinData;

        const customer = await this.userCustomerRepository.findOne({
            where: { email },
        });

        if (!customer) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, customer.password);

        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            id: customer.id,
            type: UserTypes.USER,
        };

        const token = this.jwtService.sign(payload, {
            secret: 'user-secret',
        });

        return {
            access_token: token,
        };
    }
}
