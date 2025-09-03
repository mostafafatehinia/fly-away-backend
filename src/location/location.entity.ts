import { ApiProperty } from '@nestjs/swagger';
import type { Point } from 'geojson';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Location {
  @ApiProperty({
    description: 'Unique identifier for the location',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Name of the location',
    example: 'Central Park',
  })
  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;

  @ApiProperty({
    description: 'Geographical coordinates of the location',
    example: { type: 'Point', coordinates: [-73.968285, 40.785091] },
  })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    unique: true,
  })
  coordinates: Point;

  @ApiProperty({
    description: 'Timestamp when the location was created',
    example: '2023-10-01T12:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the location was last updated',
    example: '2023-10-01T12:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
