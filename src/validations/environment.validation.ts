import Joi from 'joi';

export const environmentConfigValidation = Joi.object({
  DB_PORT: Joi.number().required(),
  DB_HOST: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.string(),
  JWT_REFRESH_TOKEN_EXPIRES_IN: Joi.string(),
  JWT_ISSUER: Joi.string(),
  JWT_AUDIENCE: Joi.string(),
});
