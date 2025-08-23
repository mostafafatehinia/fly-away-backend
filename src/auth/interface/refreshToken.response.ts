import { OmitType } from '@nestjs/swagger';
import { SignInResponse } from './signIn.response.interface';

export class RefreshTokenResponse extends OmitType(SignInResponse, [
  'refresh',
] as const) {}
