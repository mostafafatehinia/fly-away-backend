import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from './users/users.module';

import appConfig from './configs/app.config';
import dbConfig from './configs/database.config';
import jwtConfig from './configs/jwt.config';
import { environmentConfigValidation } from './validations/environment.validation';
import { AuthModule } from './auth/auth.module';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';
import { LocationModule } from './location/location.module';
import { AirlineModule } from './airline/airline.module';
import { AirportModule } from './airport/airport.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig, jwtConfig],
      validationSchema: environmentConfigValidation,
      envFilePath: ENV === 'development' ? '.env.local' : `.env.${ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          database: configService.get('database.database'),
          autoLoadEntities: true,
          synchronize: ENV === 'development',
        };
      },
    }),
    UsersModule,
    AuthModule,
    LocationModule,
    AirlineModule,
    AirportModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    AccessTokenGuard,
  ],
})
export class AppModule {}
