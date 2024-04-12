import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { BedroomsService } from 'src/bedrooms/bedrooms.service';


@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationsRepository: Repository<Reservation>,
    private bedroomsService: BedroomsService
  ) { }
  async create(createReservationDto: CreateReservationDto) {

    const bedroom = await this.bedroomsService.findOneByType({ type: createReservationDto.typeBedroom })

    const reservationRef = this.reservationsRepository.create({
      user: { id: createReservationDto.userId },
      bedroom: { id: bedroom.id },
      check_in_date: createReservationDto.check_in_date,
      check_out_date: createReservationDto.check_out_date
    })

    const reservation = await this.reservationsRepository.save(reservationRef)

    await this.bedroomsService.setBusyBedroom({ id: bedroom.id })

    return reservation


  }

  async hasReservation({ userId, currentDate }: { userId: string, currentDate: string }): Promise<{ hasReservation: boolean }> {


    const bedroom = await this.reservationsRepository.findOne({
      select: {
        id: true,
        bedroom: { status: true },
        check_in_date: true,
        check_out_date: true,
        user: { firstName: true }
      },
      where: {
        user: { id: userId },
        check_in_date: LessThanOrEqual(currentDate),
        check_out_date: MoreThanOrEqual(currentDate)
      },
      relations: {
        user: true,
        bedroom: true,

      }

    })

    return {
      hasReservation: bedroom ? true : false
    }

    /*   const bedroom = await this.reservationsRepository.findOne({
         select: {
           id: true,
           bedroom: { status: true },
           check_in_date: true,
           check_out_date: true,
           user: { firstName: true }
         },
         where: {
           user: { id: userId },
           bedroom: { status: StatusBedroomEnum.busy }
         },
         relations: {
           user: true,
           bedroom: true,
   
         }
       })
       return bedroom */

  }


  async getAllReservartions() {
    const reservations = await this.reservationsRepository.find({
      select: {
        bedroom: {
          id: true,
          bedroomType: {
            id: true,
            type: true,
          },
          num_bedroom: true,
          reservations: true,
          status: true,
        },
        user: {
          firstName: true,
          lastName: true,
          address: true,
          email: true,
          id: true,
          phone: true,
          role: true
        }
      },
      relations: {
        user: true,
        bedroom: true
      }
    })

    return reservations
  }


  async getReservationByUserId({ userId }: { userId: string }) {
    const reservations = await this.reservationsRepository.find({
      select: {
        bedroom: {
          num_bedroom: true,
        }
      },
      where: {
        user: {
          id: userId,

        }
      },
      order: {
        created_at: 'desc'
      },
      relations: {
        bedroom: true
      }
    })

    return reservations
  }
}