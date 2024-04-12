import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BedroomType } from './entities/bedroom-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BedroomTypeService {

  constructor(
    @InjectRepository(BedroomType)
    private bedroomTypeRepository: Repository<BedroomType>,
  ) { }
  async findAll() {
    const bedrooms = await this.bedroomTypeRepository.find()
    return bedrooms
  }

  findOne(id: number) {
    return `This action returns a #${id} bedroom`;
  }

  async findOneById({ id }: { id: string }) {
    const bedroomType = await this.bedroomTypeRepository.findOneBy({ id })
    return bedroomType
  }

  async findOneByType({ type }: { type: string }) {
    const bedroomType = await this.bedroomTypeRepository.findOneBy({ type: type })
    return bedroomType
  }



  async getPriceByType({ type }: { type: string }) {
    const price = await this.bedroomTypeRepository.findOne({
      select: {
        price_for_one_night: true
      },
      where: {
        type
      }
    })

    return price
  }


}
