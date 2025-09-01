import { Module } from '@nestjs/common';
import { AirportController } from './airport.controller';
import { AirportService } from './providers/airport.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airport } from './airport.entity';
import { LocationModule } from 'src/location/location.module';

@Module({
  imports: [TypeOrmModule.forFeature([Airport]), LocationModule],
  controllers: [AirportController],
  providers: [AirportService],
})
export class AirportModule {}
