import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserVendor } from './authentication/entities/authentication.entity';

@Module({
    imports: [
        AuthenticationModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 15432,
            username: 'postgres',
            password: 'jean',
            database: 'BookingService',
            entities: [UserVendor],
            synchronize: true,
        }),
    ],
})
export class AppModule {}
