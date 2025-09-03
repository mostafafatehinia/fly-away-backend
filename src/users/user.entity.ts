import { UserRole, UserStatus } from 'src/enums/user.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
  })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
  })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  lastName: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john@doe.com',
  })
  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  @Exclude()
  password: string;

  @ApiProperty({
    description: 'Status of the user account',
    example: UserStatus.ACTIVE,
    enum: UserStatus,
  })
  @Column({
    type: 'varchar',
    enum: UserStatus,
    default: UserStatus.INACTIVE,
  })
  status: string;

  @ApiProperty({
    description: 'Role of the user',
    example: UserRole.USER,
    enum: UserRole,
  })
  @Column({
    type: 'varchar',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: string;

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
