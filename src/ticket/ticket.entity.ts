import { ApiProperty } from '@nestjs/swagger';
import { STATUS } from 'src/enums/ticket.enum';
import { Flight } from 'src/flight/flight.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Ticket {
  @ApiProperty({
    description: 'Unique identifier for the ticket',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Price of the ticket',
    example: 100,
  })
  @Column({ type: 'float' })
  price: number;

  @ApiProperty({
    description: 'Flight of the ticket',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @OneToMany(() => Flight, (flight) => flight.id)
  flight: Flight;

  @ApiProperty({
    description: 'Luggage of the ticket',
    example: true,
  })
  @Column({ type: 'boolean', default: false })
  luggage: boolean;

  @ApiProperty({
    type: User,
    description: 'User of the ticket',
  })
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({
    description: 'Status of the ticket',
    example: STATUS.PENDING,
    enum: STATUS,
  })
  @Column({ type: 'enum', enum: STATUS, default: STATUS.PENDING })
  status: STATUS;

  @ApiProperty({
    description: 'Seat number of the ticket',
    example: '1234',
  })
  @Column({ type: 'varchar', unique: true, length: 4 })
  seatNumber: string;

  @ApiProperty({
    description: 'Timestamp when the ticket was created',
    example: '2023-10-01T12:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the ticket was last updated',
    example: '2023-10-01T12:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
