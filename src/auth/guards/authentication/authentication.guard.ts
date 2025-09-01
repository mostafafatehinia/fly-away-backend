import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthType } from 'src/auth/enums/authType.enum';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { Reflector } from '@nestjs/core';
import { AUTH_KEY } from 'src/auth/decorators/auth.decorator';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Private;

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  private get authTypeGuardMap(): Record<AuthType, CanActivate> {
    return {
      [AuthType.Private]: this.accessTokenGuard,
      [AuthType.Public]: { canActivate: () => true },
    };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authType = this.reflector.getAllAndOverride<AuthType[]>(AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [AuthenticationGuard.defaultAuthType];

    const guards = authType.map((type) => this.authTypeGuardMap[type]);

    for (const instance of guards) {
      const canActivate = await Promise.resolve(instance.canActivate(context));

      if (canActivate) {
        return true;
      }
    }

    throw new UnauthorizedException('Unauthorized');
  }
}
