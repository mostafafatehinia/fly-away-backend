import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BulkCreateUserDto } from './dto/bulk-create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('/bulk')
  createBulk(@Body() bulkCreateUserDtos: BulkCreateUserDto) {
    return this.usersService.createBulkUsers(bulkCreateUserDtos);
  }

  @Patch(':id')
  update(): string {
    return 'This action updates a user';
  }

  @Patch('/bulk')
  updateBulk(): string {
    return 'This action updates multiple users';
  }

  @Delete(':id')
  remove(): string {
    return 'This action removes a user';
  }

  @Delete('/bulk')
  removeBulk(): string {
    return 'This action removes multiple users';
  }
}
