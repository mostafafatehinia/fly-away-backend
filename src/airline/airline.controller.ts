import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { AirlineService } from './providers/airline.service';
import { CreateAirlineDto } from './dto/create-airline.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/authType.enum';
import { AirlineParamDto } from './dto/airline-param.dto';
import { Airline } from './airline.entity';

@Controller('airline')
export class AirlineController {
  constructor(private readonly airlineService: AirlineService) {}

  @ApiOperation({ summary: 'Get all airlines' })
  @ApiResponse({
    type: [Airline],
    status: HttpStatus.OK,
    description: 'List of airlines',
  })
  @Auth(AuthType.Public)
  @Get()
  findAll(@Query() airlineParamDto: AirlineParamDto) {
    return this.airlineService.findAll(airlineParamDto);
  }

  @ApiOperation({ summary: 'Create a new airline' })
  @ApiResponse({
    type: Airline,
    status: HttpStatus.CREATED,
    description: 'The airline has been successfully created.',
  })
  @Post()
  create(@Body() createAirlineDto: CreateAirlineDto) {
    return this.airlineService.create(createAirlineDto);
  }
}
