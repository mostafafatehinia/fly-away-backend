import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { LocationService } from './providers/location.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LocationParamDto } from './dto/location-param.dto';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './location.entity';
import { SuccessMessage } from 'src/decorators/success-message/success-message.decorator';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @ApiOperation({
    summary: 'Get Locations',
    description: 'Get all locations',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [CreateLocationDto],
    description: 'Successful get locations',
  })
  @SuccessMessage('Successfuly get locations')
  @Get()
  findAll(@Query() locationParamDto: LocationParamDto) {
    return this.locationService.findAll(locationParamDto);
  }

  @ApiOperation({
    summary: 'Create Location',
    description: 'Create a new location',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Location,
    description: 'Successful create location',
  })
  @SuccessMessage('Successfuly create location')
  @Post()
  createLocation(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.createLocation(createLocationDto);
  }
}
