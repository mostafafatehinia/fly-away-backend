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
import { BulkDeleteDto } from '../dto/bulk-delete-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

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

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload(updateUserDto);
    if (!user) {
      throw new InternalServerErrorException(
        `User with id ${updateUserDto.id} not found`,
      );
    }

    try {
      return await this.userRepository.save(user);
    } catch {
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new InternalServerErrorException(`User with id ${id} not found`);
    }
  }
  async deleteBulkUsers(bulkDeleteDto: BulkDeleteDto): Promise<void> {
    const result = await this.userRepository.delete(bulkDeleteDto.ids);
    if (result.affected === 0) {
      throw new InternalServerErrorException(
        `No users found for the provided ids: ${bulkDeleteDto.ids.join(', ')}`,
      );
    }
  }
}
