import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AirportParamDto {
  @ApiProperty({
    description: 'Search term for filtering airports',
    required: false,
    example: 'New York',
  })
  @IsString()
  @IsOptional()
  search?: string;
}
