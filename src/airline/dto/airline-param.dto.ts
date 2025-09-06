import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/dto/pagination.dto';

export class AirlineParamDto extends PaginationDto {
  @ApiProperty({
    required: false,
    description: 'Search term to filter airlines by name',
    example: 'Air',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
