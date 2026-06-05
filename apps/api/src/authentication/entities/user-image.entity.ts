import { PrimaryGeneratedColumn, Column, OneToOne, Entity } from 'typeorm';
import { UserVendor } from './user-vendor.entity';

@Entity()
export class UserImage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fileName: string;

    @Column()
    bucket: string;

    @OneToOne(() => UserVendor, (userVendor) => userVendor.userImg)
    user: UserVendor;
}
