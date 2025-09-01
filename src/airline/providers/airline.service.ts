import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Airline } from '../airline.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { CreateAirlineDto } from '../dto/create-airline.dto';
import { isDbError } from 'src/utils/isDbError.util';
import { AirlineParamDto } from '../dto/airline-param.dto';

@Injectable()
export class AirlineService {
  constructor(
    @InjectRepository(Airline)
    private readonly airlineRepository: Repository<Airline>,
  ) {}

  async findAll({ search }: AirlineParamDto): Promise<Airline[]> {
    return this.airlineRepository.find({
      where: search
        ? { name: Raw((alias) => `LOWER(${alias}) ILike '%${search}%'`) }
        : undefined,
    });
  }

  async create({ name }: CreateAirlineDto): Promise<Airline | undefined> {
    const airline = this.airlineRepository.create({ name });
    try {
      return await this.airlineRepository.save(airline);
    } catch (error) {
      if (isDbError(error) && error.code === '23505') {
        throw new ConflictException(
          `Airline with name "${name}" already exists.`,
        );
      }
      throw new InternalServerErrorException('Failed to create Airline');
    }
  }
}
