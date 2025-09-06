import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Raw, Repository } from 'typeorm';
import { Flight } from '../flight.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFlightDto } from '../dto/create-flight.dto';
import { AirlineService } from 'src/airline/providers/airline.service';
import { AirportService } from 'src/airport/providers/airport.service';
import { isDbError } from 'src/utils/isDbError.util';
import { UpdateFlightDto } from '../dto/update-flight.dto';
import { Airline } from 'src/airline/airline.entity';
import { Airport } from 'src/airport/airport.entity';
import { FlightParamDto } from '../dto/flight-param.dto';

@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,

    private readonly airLineService: AirlineService,
    private readonly airPortService: AirportService,
  ) {}

  async findAll(flightParamDto: FlightParamDto) {
    const { offset, limit, search } = flightParamDto;
    const skip = offset ?? 0;
    const take = limit ?? 10;

    const [flights, total] = await this.flightRepository.findAndCount({
      where: search
        ? { number: Raw((alias) => `LOWER(${alias}) ILike '%${search}%'`) }
        : undefined,
      skip,
      take,
    });

    console.log(flights);

    return {
      flights,
      meta: {
        total,
        offset,
        limit,
        totalPages: Math.ceil(total / (limit ?? 10)),
      },
    };
  }

  async create(createFlightDto: CreateFlightDto) {
    const airline = await this.airLineService.findById(createFlightDto.airline);

    if (!airline) {
      throw new BadRequestException(
        `Airline with id ${createFlightDto.airline} doesnt exists.`,
      );
    }

    const departure = await this.airPortService.findById(
      createFlightDto.departure,
    );

    if (!departure) {
      throw new BadRequestException(
        `Departure with id ${createFlightDto.departure} doesnt exists.`,
      );
    }

    const destination = await this.airPortService.findById(
      createFlightDto.destination,
    );

    if (!destination) {
      throw new BadRequestException(
        `Destination with id ${createFlightDto.destination} doesnt exists.`,
      );
    }

    const flight = this.flightRepository.create({
      ...createFlightDto,
      airline,
      departure,
      destination,
    });

    try {
      return await this.flightRepository.save(flight);
    } catch (error) {
      if (isDbError(error) && error.code === '23505') {
        throw new ConflictException(
          `Flight with number ${createFlightDto.number} or airline with ${airline.name} already exists.`,
        );
      }
      throw new InternalServerErrorException('Failed to create Flight');
    }
  }

  async findById(id: string) {
    return await this.flightRepository.findOneBy({ id });
  }

  async update(updateFlightDto: UpdateFlightDto) {
    let airline: Airline | null = null;
    let departure: Airport | null = null;
    let destination: Airport | null = null;

    if (updateFlightDto.airline) {
      airline =
        (await this.airLineService.findById(updateFlightDto.airline)) || null;

      if (!airline) {
        throw new BadRequestException(
          `Airline with id ${updateFlightDto.airline} doesnt exists.`,
        );
      }
    }

    if (updateFlightDto.departure) {
      departure =
        (await this.airPortService.findById(updateFlightDto.departure)) || null;

      if (!departure) {
        throw new BadRequestException(
          `Departure with id ${updateFlightDto.departure} doesnt exists.`,
        );
      }
    }

    if (updateFlightDto.destination) {
      destination =
        (await this.airPortService.findById(updateFlightDto.destination)) ||
        null;

      if (!destination) {
        throw new BadRequestException(
          `Destination with id ${updateFlightDto.destination} doesnt exists.`,
        );
      }
    }

    const flight = await this.flightRepository.preload({
      ...updateFlightDto,
      airline: airline || undefined,
      departure: departure || undefined,
      destination: destination || undefined,
    });

    if (!flight) {
      throw new NotFoundException(
        `Flight with id ${updateFlightDto.id} not found`,
      );
    }

    try {
      return await this.flightRepository.save(flight);
    } catch (error) {
      if (isDbError(error) && error.code === '23505') {
        throw new ConflictException(
          `Flight with number ${updateFlightDto.number} or airline with ${airline?.name} already exists.`,
        );
      }
      throw new InternalServerErrorException('Failed to update Flight');
    }
  }

  async delete(id: string) {
    const flight = await this.flightRepository.findOneBy({ id });
    if (!flight) {
      throw new NotFoundException(`Flight with id ${id} not found`);
    }
    await this.flightRepository.delete(id);
  }
}
