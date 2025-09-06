import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { TicketService } from './providers/ticket.service';
import { Ticket } from './ticket.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateTicketDto } from './dto/create-ticket.dto';
import type { Request } from 'express';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { SuccessMessage } from 'src/decorators/success-message/success-message.decorator';
import { TicketParamDto } from './dto/ticket-param.dto';

@ApiBearerAuth('JWT-auth')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @ApiOperation({ summary: 'Create a new ticket' })
  @ApiResponse({
    type: Ticket,
    status: HttpStatus.CREATED,
    description: 'The ticket has been successfully created.',
  })
  @SuccessMessage('Successfuly created ticket')
  @Post()
  create(@Body() createTicketDto: CreateTicketDto, @Req() request: Request) {
    return this.ticketService.create(createTicketDto, request);
  }

  @ApiOperation({ summary: 'Get current user tickets' })
  @ApiResponse({
    type: [Ticket],
    status: HttpStatus.OK,
    description: 'The tickets have been successfully retrieved.',
  })
  @SuccessMessage('Successfuly get current user tickets')
  @Get('me')
  findAllByUser(
    @Req() request: Request,
    @Query() ticketParamDto: TicketParamDto,
  ) {
    return this.ticketService.findAllByUser(request, ticketParamDto);
  }

  @ApiOperation({ summary: 'Get a ticket by id' })
  @ApiResponse({
    type: Ticket,
    status: HttpStatus.OK,
    description: 'The ticket has been successfully retrieved.',
  })
  @SuccessMessage('Successfuly get ticket by id')
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.ticketService.findOneById(id);
  }

  @ApiOperation({ summary: 'Get all tickets' })
  @ApiResponse({
    type: [Ticket],
    status: HttpStatus.OK,
    description: 'The tickets have been successfully retrieved.',
  })
  @SuccessMessage('Successfuly get all tickets')
  @Get()
  findAll(@Query() ticketParamDto: TicketParamDto) {
    return this.ticketService.findAll(ticketParamDto);
  }

  @ApiOperation({ summary: 'Update a ticket' })
  @ApiResponse({
    type: Ticket,
    status: HttpStatus.OK,
    description: 'The ticket has been successfully updated.',
  })
  @SuccessMessage('Successfuly update ticket by id')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(id, updateTicketDto);
  }

  @ApiOperation({ summary: 'Delete a ticket' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The ticket has been successfully deleted.',
  })
  @SuccessMessage('Successfuly delete ticket by id')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.ticketService.delete(id);
  }
}
