import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  ValidateNested,
  IsNumber,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';

class PointDto {
  @ApiProperty({
    description: 'GeoJSON type',
    example: 'Point',
  })
  @IsString()
  type: 'Point';

  @ApiProperty({
    description: 'Coordinates as [longitude, latitude]',
    example: [50.0041, 36.2688],
    type: [Number],
  })
  @IsNumber({}, { each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  coordinates: number[];
}

export class CreateLocationDto {
  @ApiProperty({
    description: 'Location name',
    example: 'Qazvin',
  })
  @IsString()
  name: string;

  @ApiProperty({ type: PointDto })
  @ValidateNested()
  @Type(() => PointDto)
  coordinates: PointDto;
}
