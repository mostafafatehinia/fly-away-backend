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
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieve a specific user by their unique identifier',
  })
  @ApiResponse({
    type: CreateUserDto,
    status: HttpStatus.OK,
    description: 'User found',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create a new user',
    description: 'Create a new user account with the provided information',
  })
  @ApiResponse({
    type: CreateUserDto,
    status: HttpStatus.CREATED,
    description: 'User has been created',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({
    summary: 'Update user',
    description: 'Update an existing user account with new information',
  })
  @ApiResponse({
    type: UpdateUserDto,
    status: HttpStatus.OK,
    description: 'User has been updated',
  })
  @Patch(':id')
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Delete user',
    description: 'Delete an existing user account',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User has been deleted',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.deleteUser(id);
  }
}
