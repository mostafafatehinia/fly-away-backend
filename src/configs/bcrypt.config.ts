import { registerAs } from '@nestjs/config';

export default registerAs('bcrypt', () => ({
  salt: process.env.BCRYPT_SALT || 10,
}));
