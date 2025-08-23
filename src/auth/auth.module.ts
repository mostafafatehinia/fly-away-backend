import { Module } from '@nestjs/common';
import { BcryptService } from './providers/bcrypt.service';
import { AuthService } from './providers/auth.service';
import { AuthController } from './auth.controller';
import { TokenService } from './providers/token.service';
import { UsersModule } from 'src/users/users.module';
import { forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/configs/jwt.config';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  providers: [BcryptService, AuthService, TokenService],
  exports: [BcryptService, AuthService, TokenService],
  controllers: [AuthController],
})
export class AuthModule {}
