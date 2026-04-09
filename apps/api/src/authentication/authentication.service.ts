import { Injectable } from '@nestjs/common';
import { SignupVendorData } from './dto/signup-vendor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserVendor } from './entities/authentication.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectRepository(UserVendor)
        private userVendorRepository: Repository<UserVendor>,
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
}
