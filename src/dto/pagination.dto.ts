import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({
    description: 'Offset number',
    example: 0,
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  offset?: number;

  @ApiProperty({
    description: 'Limit number',
    example: 10,
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit?: number;
}
