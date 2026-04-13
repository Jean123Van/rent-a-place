import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

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

    async validate(payload: any) {
        // Return correct value
        return {};
    }
}
