import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/dto/pagination.dto';

export class FlightParamDto extends PaginationDto {
  @ApiProperty({
    description: 'Search term for filtering flights',
    required: false,
    example: 'AA123',
  })
  @IsString()
  @IsOptional()
  search?: string;
}
