import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Ticket } from '../ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { FlightService } from 'src/flight/providers/flight.service';
import { UserService } from 'src/user/providers/user.service';
import { isDbError } from 'src/utils/isDbError.util';
import { Request } from 'express';
import { PayloadTokenResponse } from 'src/auth/interface/payloadToken.response';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { Flight } from 'src/flight/flight.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly flightService: FlightService,
    private readonly userService: UserService,
  ) {}

  async create(createTicketDto: CreateTicketDto, request: Request) {
    const flight = await this.flightService.findById(createTicketDto.flight);
    if (!flight) {
      throw new BadRequestException(
        `Flight with id ${createTicketDto.flight} doesnt exists.`,
      );
    }
    const userPayload = request['user'] as PayloadTokenResponse;
    const userId = userPayload.sub;
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new BadRequestException(`User with id ${userId} doesnt exists.`);
    }

    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      flight,
      user,
    });

    try {
      flight.seats -= 1;
      await this.flightService.update({
        id: flight.id,
        seats: flight.seats,
      });
      return await this.ticketRepository.save(ticket);
    } catch (error) {
      if (isDbError(error) && error.code === '23505') {
        throw new ConflictException(
          `Ticket with seat number ${createTicketDto.seatNumber} already exists.`,
        );
      }
      throw new InternalServerErrorException('Failed to create Ticket');
    }
  }

  async findOneById(id: string) {
    return await this.ticketRepository.findOneBy({ id });
  }

  async findAll() {
    return await this.ticketRepository.find();
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    let flight: Flight | null = null;

    if (updateTicketDto.flight) {
      flight = await this.flightService.findById(updateTicketDto.flight);
      if (!flight) {
        throw new BadRequestException(
          `Flight with id ${updateTicketDto.flight} doesnt exists.`,
        );
      }
    }
    const ticket = await this.ticketRepository.preload({
      id,
      ...updateTicketDto,
      flight: flight || undefined,
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with id ${id} not found`);
    }

    try {
      return await this.ticketRepository.save(ticket);
    } catch (error) {
      if (isDbError(error) && error.code === '23505') {
        throw new ConflictException(
          `Ticket with seat number ${updateTicketDto.seatNumber} already exists.`,
        );
      }
      throw new InternalServerErrorException('Failed to update Ticket');
    }
  }

  async delete(id: string) {
    const ticket = await this.ticketRepository.findOneBy({ id });
    if (!ticket) {
      throw new NotFoundException(`Ticket with id ${id} not found`);
    }
    await this.ticketRepository.delete(id);
  }
}
