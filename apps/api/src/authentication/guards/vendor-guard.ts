import { AuthGuard } from '@nestjs/passport';

export class VendorAuthGuard extends AuthGuard('vendor-jwt') {}
