import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AirlineParamDto {
  @ApiProperty({
    required: false,
    description: 'Search term to filter airlines by name',
    example: 'Air',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
