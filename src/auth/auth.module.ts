import { Module } from '@nestjs/common';
import { BcryptService } from './providers/bcrypt.service';

@Module({
  providers: [BcryptService],
  exports: [BcryptService],
})
export class AuthModule {}
