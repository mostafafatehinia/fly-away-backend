import { ApiProperty } from '@nestjs/swagger';
import { Airline } from 'src/airline/airline.entity';
import { Airport } from 'src/airport/airport.entity';
import { CABIN_CLASS, FLIGHT_TYPE, STATUS } from 'src/enums/flight.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['number', 'airline'])
export class Flight {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
    description: 'Unique identifier for the flight',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'AA123',
    description: 'Flight number',
  })
  @Column({
    type: 'varchar',
    length: 6,
  })
  number: string;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
    description: 'Identifier of the airline operating the flight',
  })
  @ManyToOne(() => Airline, { eager: true })
  @JoinColumn({ name: 'airlineId' })
  airline: Airline;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
    description: 'Identifier of the departure airport',
  })
  @ManyToOne(() => Airport, { eager: true })
  @JoinColumn({ name: 'departureAirportId' })
  departure: Airport;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
    description: 'Identifier of the destination airport',
  })
  @ManyToOne(() => Airport, { eager: true })
  @JoinColumn({ name: 'destinationAirportId' })
  destination: Airport;

  @ApiProperty({
    enum: FLIGHT_TYPE,
    example: 'NONSTOP',
    description: 'Type of the flight',
  })
  @Column({
    type: 'enum',
    enum: FLIGHT_TYPE,
  })
  type: FLIGHT_TYPE;

  @ApiProperty({
    enum: CABIN_CLASS,
    example: 'ECONOMY',
    description: 'Cabin class of the flight',
  })
  @Column({
    type: 'enum',
    enum: CABIN_CLASS,
  })
  cabinClass: CABIN_CLASS;

  @ApiProperty({
    example: 12,
    description: 'Number of seats available on the flight',
  })
  @Column({
    type: 'int',
    default: 12,
  })
  seats: number;

  @ApiProperty({
    enum: STATUS,
    example: 'SCHEDULED',
    description: 'Status of the flight',
  })
  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.SCHEDULED,
  })
  status: STATUS;

  @ApiProperty({
    description: 'Timestamp when the user was created',
    example: '2023-10-01T12:00:00Z',
  })
  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the user was last updated',
    example: '2023-10-01T12:00:00Z',
  })
  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;
}
