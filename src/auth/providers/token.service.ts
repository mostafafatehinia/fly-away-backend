import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { SignInResponse } from '../interface/signIn.response.interface';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(user: User, type: 'access' | 'refresh') {
    const payload = {
      sub: user.id,
      ...(type === 'access' && { role: user.role, status: user.status }),
    };
    return await this.jwtService.signAsync(payload, {
      expiresIn:
        type === 'access'
          ? this.configService.get('jwt.accessTokenExpiresIn')
          : this.configService.get('jwt.refreshTokenExpiresIn'),
      secret: this.configService.get('jwt.secret'),
      issuer: this.configService.get('jwt.issuer'),
      audience: this.configService.get('jwt.audience'),
    });
  }

  async verifyToken(token: string): Promise<{ sub: string }> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('jwt.secret'),
        issuer: this.configService.get('jwt.issuer'),
        audience: this.configService.get('jwt.audience'),
      });
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async parseToken(token: string): Promise<{ role: string }> {
    try {
      return await this.jwtService.decode(token);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async signIn(user: User): Promise<SignInResponse> {
    const access = await this.generateToken(user, 'access');
    const refresh = await this.generateToken(user, 'refresh');

    return { access, refresh };
  }

  async refreshToken(refresh: string) {
    const { sub } = await this.verifyToken(refresh);

    if (!sub) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return await this.generateToken({ id: sub } as User, 'access');
  }
}
