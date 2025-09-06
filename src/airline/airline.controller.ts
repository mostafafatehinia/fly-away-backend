import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { AirlineService } from './providers/airline.service';
import { CreateAirlineDto } from './dto/create-airline.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AirlineParamDto } from './dto/airline-param.dto';
import { Airline } from './airline.entity';
import { SuccessMessage } from 'src/decorators/success-message/success-message.decorator';

@ApiBearerAuth('JWT-auth')
@Controller('airline')
export class AirlineController {
  constructor(private readonly airlineService: AirlineService) {}

  @ApiOperation({ summary: 'Get all airlines' })
  @ApiResponse({
    type: [Airline],
    status: HttpStatus.OK,
    description: 'List of airlines',
  })
  @SuccessMessage('Successfuly get airlines')
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
  @SuccessMessage('Successfuly created airline')
  @Post()
  create(@Body() createAirlineDto: CreateAirlineDto) {
    return this.airlineService.create(createAirlineDto);
  }
}
