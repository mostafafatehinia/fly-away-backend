import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, Length } from 'class-validator';

export class CreateAirportDto {
  @ApiProperty({
    description: 'Name of the airport',
    example: 'Los Angeles International Airport',
  })
  @IsString()
  @Length(3, 100)
  name: string;

  @ApiProperty({
    description: 'IATA code of the airport',
    example: 'LAX',
  })
  @IsString()
  @Length(3, 4)
  iata: string;

  @ApiProperty({
    description: 'Location ID of the airport',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsUUID()
  locationId: string;
}
