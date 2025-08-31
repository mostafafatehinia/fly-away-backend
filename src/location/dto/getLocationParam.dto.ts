import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetLocationParamDto {
  @ApiProperty({
    description: 'Location name',
    example: 'qazvin',
    required: false,
  })
  @IsString()
  @IsOptional()
  search?: string;
}
