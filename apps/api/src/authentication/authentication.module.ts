import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserVendor } from './entities/authentication.entity';
import { JwtModule } from '@nestjs/jwt';
import { VendorJwtStrategy } from './strategy/vendor-jwt.strategy';
import { UserJwtStrategy } from './strategy/user-jwt.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserVendor]),
        JwtModule.register({
            secret: 'user-secret',
        }),
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService, VendorJwtStrategy, UserJwtStrategy],
})
export class AuthenticationModule {}
