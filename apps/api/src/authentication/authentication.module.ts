import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserVendor } from './entities/authentication.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserVendor]),
        JwtModule.register({
            secret: 'user-secret',
        }),
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService],
})
export class AuthenticationModule {}
