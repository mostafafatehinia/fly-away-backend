import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFlightDto } from './create-flight.dto';
import { IsUUID } from 'class-validator';

export class UpdateFlightDto extends PartialType(CreateFlightDto) {
  @ApiProperty({
    description: 'Unique identifier for the flight',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  id: string;
}
