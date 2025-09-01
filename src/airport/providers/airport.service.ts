import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Raw, Repository } from 'typeorm';
import { Airport } from '../airport.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAirportDto } from '../dto/create-airport.dto';
import { LocationService } from 'src/location/providers/location.service';
import { isDbError } from 'src/utils/isDbError.util';

@Injectable()
export class AirportService {
  constructor(
    @InjectRepository(Airport)
    private readonly airportRepository: Repository<Airport>,
    private readonly locationService: LocationService,
  ) {}

  async findAll(search?: string): Promise<Airport[]> {
    return this.airportRepository.find({
      where: search
        ? { name: Raw((alias) => `LOWER(${alias}) ILike '%${search}%'`) }
        : undefined,
    });
  }

  async create(createAirportDto: CreateAirportDto): Promise<Airport> {
    const location = await this.locationService.findById(
      createAirportDto.locationId,
    );
    if (!location) {
      throw new BadRequestException(
        `Location with ID ${createAirportDto.locationId} does not exist`,
      );
    }

    const airport = this.airportRepository.create({
      ...createAirportDto,
      location,
    });

    try {
      return await this.airportRepository.save(airport);
    } catch (error) {
      if (isDbError(error) && error.code === '23505') {
        throw new ConflictException(
          `Airport with name ${createAirportDto.name} or IATA code ${createAirportDto.iata} already exists`,
        );
      }
      throw new InternalServerErrorException(
        'An error occurred while creating the airport',
      );
    }
  }
}
