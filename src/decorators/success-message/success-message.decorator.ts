import { SetMetadata } from '@nestjs/common';

export const SUCCESS_MESSAGE_KEY = 'success-message';

export const SuccessMessage = (...args: string[]) =>
  SetMetadata(SUCCESS_MESSAGE_KEY, args);
