import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Airline {
  @ApiProperty({
    description: 'Unique identifier for the airline',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Name of the airline',
    example: 'American Airlines',
  })
  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  name: string;

  @ApiProperty({
    description: 'Timestamp when the airline was created',
    example: '2023-10-01T12:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the airline was last updated',
    example: '2023-10-01T12:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
