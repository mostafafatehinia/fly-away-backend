import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LocationService } from './providers/location.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/authType.enum';
import { GetLocationParamDto } from './dto/getLocationParam.dto';
import { CreateLocationDto } from './dto/createLocation.dto';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @ApiOperation({
    summary: 'Get Locations',
    description: 'Get all locations',
  })
  @ApiResponse({
    type: [CreateLocationDto],
    description: 'Successful get locations',
  })
  @Auth(AuthType.Public)
  @Get()
  getLocations(@Query() { search }: GetLocationParamDto) {
    return this.locationService.getLocations(search);
  }

  @ApiOperation({
    summary: 'Create Location',
    description: 'Create a new location',
  })
  @ApiResponse({
    type: CreateLocationDto,
    description: 'Successful create location',
  })
  @Auth(AuthType.Public)
  @Post()
  createLocation(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.createLocation(createLocationDto);
  }
}
