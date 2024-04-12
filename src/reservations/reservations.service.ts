import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { BedroomsService } from 'src/bedrooms/bedrooms.service';
import { EmailService } from 'src/email/email.service';


@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationsRepository: Repository<Reservation>,
    private bedroomsService: BedroomsService,
    private emailService: EmailService
  ) { }
  async create(createReservationDto: CreateReservationDto) {

    const bedroom = await this.bedroomsService.findOneByType({ type: createReservationDto.typeBedroom })

    const reservationRef = this.reservationsRepository.create({
      user: { id: createReservationDto.userId },
      bedroom: { id: bedroom.id },
      check_in_date: createReservationDto.check_in_date,
      check_out_date: createReservationDto.check_out_date
    })

    const reservationCreated = await this.reservationsRepository.save(reservationRef)

    await this.bedroomsService.setBusyBedroom({ id: bedroom.id })

    const reservation = await this.reservationsRepository.findOne({
      select: {
        id: true,
        check_in_date: true,
        check_out_date: true,
        user: {
          firstName: true,
          lastName: true,
          email: true,
        },
        bedroom: {
          num_bedroom: true,
          bedroomType: {
            type: true,
            price_for_one_night: true
          }
        }
      },
      where: {
        id: reservationCreated.id
      },

      relations: {
        bedroom: {
          bedroomType: true
        },
        user: true,

      }
    })

    await this.emailService.sendEmailTicket({
      email: reservation.user.email,
      firstName: reservation.user.firstName,
      lastName: reservation.user.lastName,
      check_in_date: reservation.check_in_date,
      check_out_date: reservation.check_out_date,
      idReservation: reservation.id,
      num_bedroom: reservation.bedroom.num_bedroom,
      price_for_one_night: reservation.bedroom.bedroomType.price_for_one_night,
      typeBedroom: reservation.bedroom.bedroomType.type
    })

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