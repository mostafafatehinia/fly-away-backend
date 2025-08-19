import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll(): string {
    return 'This action returns all users';
  }
  @Get(':id')
  findOne(): string {
    return 'This action returns a user';
  }

  @Post()
  create(): string {
    return 'This action adds a new user';
  }

  @Post('/bulk')
  createBulk(): string {
    return 'This action adds multiple new users';
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
