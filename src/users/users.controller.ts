import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BulkCreateUserDto } from './dto/bulk-create-user.dto';
import { BulkDeleteDto } from './dto/bulk-delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(updateUserDto);
  }

  @Delete('bulk')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeBulk(@Body() bulkDeleteDto: BulkDeleteDto) {
    return this.usersService.deleteBulkUsers(bulkDeleteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.deleteUser(id);
  }
}
