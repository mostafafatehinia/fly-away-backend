import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums/authType.enum';

export const AUTH_KEY = 'authType';

export const Auth = (...authTypes: AuthType[]) =>
  SetMetadata(AUTH_KEY, authTypes);
