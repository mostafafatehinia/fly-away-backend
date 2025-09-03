import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsUUID, Length } from 'class-validator';
import { CABIN_CLASS, FLIGHT_TYPE, STATUS } from 'src/enums/flight.enum';

export class CreateFlightDto {
  @ApiProperty({
    example: 'AA123',
    description: 'Flight number',
  })
  @Length(3, 6)
  number: string;

  @ApiProperty({
    example: 'uuid',
    description: 'Identifier of the airline operating the flight',
  })
  @IsUUID()
  airline: string;

  @ApiProperty({
    example: 'uuid',
    description: 'Identifier of the departure airport',
  })
  @IsUUID()
  departure: string;

  @ApiProperty({
    example: 'uuid',
    description: 'Identifier of the destination airport',
  })
  @IsUUID()
  destination: string;

  @ApiProperty({
    enum: FLIGHT_TYPE,
    example: 'NONSTOP',
    description: 'Type of the flight',
  })
  @IsEnum(FLIGHT_TYPE)
  type: FLIGHT_TYPE;

  @ApiProperty({
    enum: CABIN_CLASS,
    example: 'ECONOMY',
    description: 'Cabin class of the flight',
  })
  @IsEnum(CABIN_CLASS)
  cabinClass: CABIN_CLASS;

  @ApiProperty({
    example: 12,
    description: 'Number of seats available on the flight',
  })
  @IsInt()
  seats: number;

  @ApiProperty({
    enum: STATUS,
    example: 'SCHEDULED',
    description: 'Status of the flight',
    required: false,
  })
  @IsEnum(STATUS)
  @IsOptional()
  status?: STATUS;
}
