import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/dto/pagination.dto';

export class TicketParamDto extends PaginationDto {
  @ApiProperty({
    description: 'Search term for filtering tickets',
    required: false,
    example: 'AA13',
  })
  @IsString()
  @IsOptional()
  search?: string;
}
