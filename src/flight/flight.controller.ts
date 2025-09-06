import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FlightService } from './providers/flight.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Flight } from './flight.entity';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { SuccessMessage } from 'src/decorators/success-message/success-message.decorator';
import { FlightParamDto } from './dto/flight-param.dto';

@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @ApiOperation({
    summary: 'Get flights list',
    description: 'Get flights list with search option',
  })
  @ApiResponse({
    type: [Flight],
    status: HttpStatus.OK,
    description: 'Get all flights list',
  })
  @SuccessMessage('Successfuly get flights list')
  @Get()
  findAll(@Query() flightParamDto: FlightParamDto) {
    return this.flightService.findAll(flightParamDto);
  }

  @ApiOperation({
    summary: 'Get flight by id',
    description: 'Get a flight by id',
  })
  @ApiResponse({
    type: Flight,
    status: HttpStatus.OK,
    description: 'Successful get flight by id',
  })
  @SuccessMessage('Successfuly get flight by id')
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.flightService.findById(id);
  }

  @ApiOperation({
    summary: 'Create flight',
    description: 'Create a flight based on airline,departure and destination',
  })
  @ApiResponse({
    type: Flight,
    status: HttpStatus.CREATED,
    description: 'Successful create flight',
  })
  @SuccessMessage('Successfuly create flight')
  @Post()
  create(@Body() createFlightDto: CreateFlightDto) {
    return this.flightService.create(createFlightDto);
  }

  @ApiOperation({
    summary: 'Update flight',
    description: 'Update a flight by id',
  })
  @ApiResponse({
    type: Flight,
    status: HttpStatus.OK,
    description: 'Successful update flight by id',
  })
  @SuccessMessage('Successfuly update flight by id')
  @Patch()
  update(@Body() updateFlightDto: UpdateFlightDto) {
    return this.flightService.update(updateFlightDto);
  }

  @ApiOperation({
    summary: 'Delete flight',
    description: 'Delete a flight by id',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Successful delete flight by id',
  })
  @SuccessMessage('Successfuly delete flight by id')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.flightService.delete(id);
  }
}
