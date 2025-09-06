import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/dto/pagination.dto';

export class LocationParamDto extends PaginationDto {
  @ApiProperty({
    description: 'Location name',
    example: 'qazvin',
    required: false,
  })
  @IsString()
  @IsOptional()
  search?: string;
}
