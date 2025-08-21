import { UserRole, UserStatus } from 'src/enums/user.enum';
import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 50)
  @IsOptional()
  firstName?: string;

  @IsString()
  @Length(2, 50)
  @IsOptional()
  lastName?: string;

  @IsString()
  @Length(5, 100)
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 100)
  password: string;

  @IsString()
  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;

  @IsString()
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
