import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './providers/flight.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './flight.entity';
import { AirlineModule } from 'src/airline/airline.module';
import { AirportModule } from 'src/airport/airport.module';

@Module({
  imports: [TypeOrmModule.forFeature([Flight]), AirlineModule, AirportModule],
  controllers: [FlightController],
  providers: [FlightService],
  exports: [FlightService],
})
export class FlightModule {}
