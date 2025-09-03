import { ApiProperty } from '@nestjs/swagger';
import { STATUS } from 'src/enums/ticket.enum';
import {
  IsNumber,
  IsBoolean,
  IsString,
  IsEnum,
  IsUUID,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({
    example: 100,
    description: 'Price of the ticket',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: true,
    description: 'Luggage of the ticket',
  })
  @IsBoolean()
  luggage: boolean;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Flight ID of the ticket',
  })
  @IsUUID()
  flight: string;

  @ApiProperty({
    example: STATUS.PENDING,
    enum: STATUS,
    description: 'Status of the ticket',
  })
  @IsEnum(STATUS)
  @IsOptional()
  status?: STATUS;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Seat number of the ticket',
  })
  @IsString()
  @Length(4, 4)
  seatNumber: string;
}
