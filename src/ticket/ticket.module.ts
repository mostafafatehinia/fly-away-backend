import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './providers/ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { UsersModule } from 'src/users/users.module';
import { FlightModule } from 'src/flight/flight.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]), FlightModule, UsersModule],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
