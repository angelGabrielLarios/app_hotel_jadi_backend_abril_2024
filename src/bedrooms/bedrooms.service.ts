import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';


import { InjectRepository } from '@nestjs/typeorm';
import { Bedroom, StatusBedroomEnum } from './entities/bedroom.entity';
import { Repository } from 'typeorm';
import { UpdateStatusByNumberBedroom } from './dto/update-status-by-number-bedroom.dto';

@Injectable()
export class BedroomsService {

  constructor(
    @InjectRepository(Bedroom)
    private bedroomsRepository: Repository<Bedroom>,
  ) { }

  async findAll() {
    const bedrooms = await this.bedroomsRepository.find({
      select: {
        id: true,
        status: true,
        num_bedroom: true,
        bedroomType: {
          id: true,
          type: true,
        },
      },
      relations: {
        bedroomType: true
      }
    })

    return bedrooms
  }

  async findOneByType({ type }: { type: string }) {
    const bedroom = await this.bedroomsRepository.findOneBy({
      bedroomType: {
        type,
      },
      status: StatusBedroomEnum.available

    })

    if (!bedroom) {
      throw new NotFoundException(`rooms_not_available`, { cause: new Error(), description: `rooms_not_available` })
    }

    return bedroom
  }

  async setBusyBedroom({ id }: { id: string }) {
    await this.bedroomsRepository.update({ id }, { status: StatusBedroomEnum.busy })

  }

  async getStatistics() {
    const bedroomsTotal = await this.bedroomsRepository.findAndCount({})
    const bedroomsAvailable = await this.bedroomsRepository.findAndCount({
      where: {
        status: StatusBedroomEnum.available
      }
    })
    const bedroomsBusy = await this.bedroomsRepository.findAndCount({
      where: {
        status: StatusBedroomEnum.busy
      }
    })


    return {
      number_total_bedrooms: bedroomsTotal[1],
      number_occupied_bedrooms: bedroomsBusy[1],
      number_available_bedrooms: bedroomsAvailable[1],
    }
  }

  async findOneById({ id }: { id: string }) {
    const bedroom = await this.bedroomsRepository.findOneBy({ id })
    return bedroom
  }

  async findOneByNumberBedroom({ num_bedroom }: { num_bedroom: number }) {
    const bedroom = await this.bedroomsRepository.findOne({
      where: {
        num_bedroom
      }
    })

    if (!bedroom) {
      throw new BadRequestException(`bedroom_not_found`, { cause: new Error(), description: `bedroom_not_found` })
    }

    return bedroom
  }



  async updateStatusByNumberBedroom({ num_bedroom, status }: UpdateStatusByNumberBedroom) {
    const bedroomUpdate = await this.bedroomsRepository.update(
      { num_bedroom },
      { status }
    )
    return bedroomUpdate
  }




}
