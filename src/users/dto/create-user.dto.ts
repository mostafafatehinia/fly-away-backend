import { UserRole, UserStatus } from 'src/enums/user.enum';
import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiPropertyOptional({
    description: 'First name of the user',
    example: 'John',
  })
  @IsString()
  @Length(2, 50)
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({
    description: 'Last name of the user',
    example: 'Doe',
  })
  @IsString()
  @Length(2, 50)
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'john@doe.com',
  })
  @IsString()
  @Length(5, 100)
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'securepassword123',
  })
  @IsString()
  @Length(6, 100)
  password: string;

  @ApiPropertyOptional({ enum: UserStatus, example: UserStatus.ACTIVE })
  @IsString()
  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;

  @ApiPropertyOptional({ enum: UserRole, example: UserRole.USER })
  @IsString()
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
