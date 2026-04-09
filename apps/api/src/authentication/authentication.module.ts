import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserVendor } from './entities/authentication.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserVendor])],
    controllers: [AuthenticationController],
    providers: [AuthenticationService],
})
export class AuthenticationModule {}
