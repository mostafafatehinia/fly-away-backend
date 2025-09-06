import { Injectable } from '@nestjs/common';
import { Raw, Repository } from 'typeorm';
import { Location } from '../location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLocationDto } from '../dto/create-location.dto';
import { LocationParamDto } from '../dto/location-param.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async findAll(locationParamDto: LocationParamDto) {
    const { offset, limit, search } = locationParamDto;
    const skip = offset ?? 0;
    const take = limit ?? 10;

    const [locations, total] = await this.locationRepository.findAndCount({
      where: search
        ? {
            name: Raw((alias) => `LOWER(${alias}) ILike '%${search}%'`),
          }
        : undefined,
      skip,
      take,
    });
    return {
      locations,
      meta: {
        total,
        offset,
        limit,
        totalPages: Math.ceil(total / (limit ?? 10)),
      },
    };
  }

  async findById(id: string): Promise<Location | null> {
    return await this.locationRepository.findOne({
      where: { id },
    });
  }

  async createLocation(createLocationDto: CreateLocationDto) {
    const location = this.locationRepository.create(createLocationDto);
    return await this.locationRepository.save(location);
  }
}
