import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { AirportService } from './providers/airport.service';
import { CreateAirportDto } from './dto/create-airport.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Airport } from './airport.entity';
import { AirportParamDto } from './dto/airport-param.dto';
import { SuccessMessage } from 'src/decorators/success-message/success-message.decorator';

@ApiBearerAuth('JWT-auth')
@Controller('airport')
export class AirportController {
  constructor(private readonly airportService: AirportService) {}

  @ApiOperation({
    summary: 'Get Airports',
    description: 'Get all airports',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [CreateAirportDto],
    description: 'Successful get airports',
  })
  @SuccessMessage('Successfuly get airports')
  @Get()
  findAll(@Query() airportParamDto: AirportParamDto) {
    return this.airportService.findAll(airportParamDto);
  }

  @ApiOperation({
    summary: 'Create Airport',
    description: 'Create a new airport',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Airport,
    description: 'Successful create airport',
  })
  @SuccessMessage('Successfuly created airport')
  @Post()
  create(@Body() createAirportDto: CreateAirportDto) {
    return this.airportService.create(createAirportDto);
  }
}
