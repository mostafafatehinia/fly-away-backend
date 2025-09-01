import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { AirportService } from './providers/airport.service';
import { CreateAirportDto } from './dto/create-airport.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/authType.enum';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Airport } from './airport.entity';
import { AirportParamDto } from './dto/airport-param.dto';

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
  @Auth(AuthType.Public)
  @Get()
  findAll(@Query() { search }: AirportParamDto) {
    return this.airportService.findAll(search);
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
  @Post()
  create(@Body() createAirportDto: CreateAirportDto) {
    return this.airportService.create(createAirportDto);
  }
}
