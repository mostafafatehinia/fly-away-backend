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
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
} from '@nestjs/common';
import { UserService } from './providers/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './user.entity';
import { PayloadTokenResponse } from 'src/auth/interface/payloadToken.response';
import { SuccessMessage } from 'src/decorators/success-message/success-message.decorator';

@ApiBearerAuth('JWT-auth')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @ApiOperation({
    summary: 'Get current user',
    description: 'Retrieve the current user',
  })
  @ApiResponse({
    type: User,
    status: HttpStatus.OK,
    description: 'User found',
  })
  @SuccessMessage('Successfuly get current user')
  @Get('me')
  me(@Req() req: Request) {
    const userPayload = req['user'] as PayloadTokenResponse;
    return this.UserService.findOne(userPayload.sub);
  }

  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieve a specific user by their unique identifier',
  })
  @ApiResponse({
    type: CreateUserDto,
    status: HttpStatus.OK,
    description: 'User found',
  })
  @SuccessMessage('Successfuly get user by id')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.UserService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create a new user',
    description: 'Create a new user account with the provided information',
  })
  @ApiResponse({
    type: User,
    status: HttpStatus.CREATED,
    description: 'User has been created',
  })
  @SuccessMessage('Successfuly create user')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.UserService.createUser(createUserDto);
  }

  @ApiOperation({
    summary: 'Update user',
    description: 'Update an existing user account with new information',
  })
  @ApiResponse({
    type: User,
    status: HttpStatus.OK,
    description: 'User has been updated',
  })
  @SuccessMessage('Successfuly update user by id')
  @Patch(':id')
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.UserService.updateUser(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Delete user',
    description: 'Delete an existing user account',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User has been deleted',
  })
  @SuccessMessage('Successfuly delete user by id')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.UserService.deleteUser(id);
  }
}
