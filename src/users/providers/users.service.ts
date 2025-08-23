import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { isDbError } from 'src/utils/isDbError.util';
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

  async findOne(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload(updateUserDto);
    if (!user) {
      throw new InternalServerErrorException(`User with id ${id} not found`);
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
}
