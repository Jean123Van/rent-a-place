import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserTypes } from 'src/utils/types/user-types';

@Injectable()
export class VendorJwtStrategy extends PassportStrategy(
    Strategy,
    'vendor-jwt',
) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'vendor-secret',
        });
    }

    async validate(payload: { id: string; type: UserTypes }) {
        return payload;
    }
}
