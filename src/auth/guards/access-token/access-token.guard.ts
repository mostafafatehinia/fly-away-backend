import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from 'src/auth/providers/token.service';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const [, accessToken] = request.headers.authorization?.split(' ') ?? [];

    if (!accessToken) {
      throw new UnauthorizedException('Access token is required');
    }

    const parsedToken = await this.tokenService.parseToken(accessToken);

    if (!parsedToken?.role) {
      throw new UnauthorizedException('Invalid access token');
    }

    try {
      const payload = await this.tokenService.verifyToken(accessToken);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid access token');
    }

    return true;
  }
}
