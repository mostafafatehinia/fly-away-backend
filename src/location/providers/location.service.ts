import { Injectable } from '@nestjs/common';
import { Raw, Repository } from 'typeorm';
import { Location } from '../location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLocationDto } from '../dto/create-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  findAll(search?: string) {
    return this.locationRepository.find({
      where: search
        ? { name: Raw((alias) => `LOWER(${alias}) ILike '%${search}%'`) }
        : undefined,
    });
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
