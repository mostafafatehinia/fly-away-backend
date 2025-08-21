import { ArrayMinSize, IsArray } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class BulkCreateUserDto {
  @IsArray()
  @ArrayMinSize(1)
  users: CreateUserDto[];
}
