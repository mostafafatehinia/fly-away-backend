import { ApiProperty } from '@nestjs/swagger';
import { Location } from 'src/location/location.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Airport {
  @ApiProperty({
    description: 'Unique identifier for the airport',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Name of the airport',
    example: 'Los Angeles International Airport',
  })
  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @ApiProperty({
    description: 'IATA code of the airport',
    example: 'LAX',
  })
  @Column({ type: 'varchar', length: 4, unique: true })
  iata: string;
  @ManyToOne(() => Location, { eager: true })
  @JoinColumn({ name: 'locationId' })
  location: Location;

  @ApiProperty({
    description: 'Timestamp when the airport was created',
    example: '2023-10-01T12:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the airport was last updated',
    example: '2023-10-01T12:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
