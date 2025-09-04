import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './providers/ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { UserModule } from 'src/user/user.module';
import { FlightModule } from 'src/flight/flight.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]), FlightModule, UserModule],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
