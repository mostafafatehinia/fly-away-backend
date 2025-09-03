import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { LocationService } from './providers/location.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/authType.enum';
import { LocationParamDto } from './dto/location-param.dto';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './location.entity';

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
  @Auth(AuthType.Public)
  @Get()
  findAll(@Query() { search }: LocationParamDto) {
    return this.locationService.findAll(search);
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
  @Post()
  createLocation(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.createLocation(createLocationDto);
  }
}
