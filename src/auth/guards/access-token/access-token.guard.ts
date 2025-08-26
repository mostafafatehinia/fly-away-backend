import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { TokenService } from 'src/auth/providers/token.service';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const [, accessToken] = request.headers.authorization?.split(' ') ?? [];

    if (!accessToken) {
      throw new UnauthorizedException('Access token is required');
    }

    try {
      const payload = this.tokenService.verifyToken(accessToken);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid access token');
    }

    return true;
  }
}
