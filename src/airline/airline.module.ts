import { Module } from '@nestjs/common';
import { AirlineController } from './airline.controller';
import { AirlineService } from './providers/airline.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airline } from './airline.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Airline])],
  controllers: [AirlineController],
  providers: [AirlineService],
})
export class AirlineModule {}
