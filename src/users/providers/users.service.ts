import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { In, Repository } from 'typeorm';
import { BulkCreateUserDto } from '../dto/bulk-create-user.dto';
import { isDbError } from 'src/utils/isDbError.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (isDbError(error) && error.code === '23505') {
        throw new ConflictException(
          `User with email ${createUserDto.email} already exists.`,
        );
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async createBulkUsers(
    bulkCreateUserDtos: BulkCreateUserDto,
  ): Promise<User[]> {
    const emails = bulkCreateUserDtos.users.map((u) => u.email);
    const existingUsers = await this.userRepository.find({
      where: { email: In(emails) },
      select: ['email'],
    });

    if (existingUsers.length > 0) {
      const existingEmails = existingUsers.map((u) => u.email).join(', ');
      throw new ConflictException(
        `Users with these emails already exist: ${existingEmails}`,
      );
    }

    const users = this.userRepository.create(bulkCreateUserDtos.users);
    try {
      return await this.userRepository.save(users);
    } catch (error) {
      if (isDbError(error) && error.code === '23505') {
        throw new ConflictException(
          `Duplicate email detected during bulk insert.`,
        );
      }
      throw new InternalServerErrorException('Failed to create users');
    }
  }
}
