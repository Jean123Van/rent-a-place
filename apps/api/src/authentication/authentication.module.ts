import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserVendor } from './entities/user-vendor.entity';
import { JwtModule } from '@nestjs/jwt';
import { VendorJwtStrategy } from './strategy/vendor-jwt.strategy';
import { UserJwtStrategy } from './strategy/user-jwt.strategy';
import { UserCustomer } from './entities/user-customer.entity';
import { MinioService } from 'src/minio/minio.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserVendor, UserCustomer]),
        JwtModule.register({
            secret: 'user-secret',
        }),
    ],
    controllers: [AuthenticationController],
    providers: [
        AuthenticationService,
        VendorJwtStrategy,
        UserJwtStrategy,
        MinioService,
    ],
})
export class AuthenticationModule {}
