import { Injectable } from '@nestjs/common';
import { Raw, Repository } from 'typeorm';
import { Location } from '../location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLocationDto } from '../dto/createLocation.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  getLocations(search?: string) {
    return this.locationRepository.find({
      where: { name: Raw((alias) => `LOWER(${alias}) ILike '%${search}%'`) },
    });
  }

  async createLocation(createLocationDto: CreateLocationDto) {
    const location = this.locationRepository.create(createLocationDto);
    return await this.locationRepository.save(location);
  }
}
