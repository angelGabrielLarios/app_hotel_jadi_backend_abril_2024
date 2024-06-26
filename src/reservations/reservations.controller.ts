import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { CreateHasReservationDto } from './dto/has-reservation.dto';


@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) { }

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @Post('hasReservation')
  hasReservation(@Body() createHasReservation: CreateHasReservationDto) {
    const { currentDate, userId } = createHasReservation
    return this.reservationsService.hasReservation({ userId, currentDate })
  }


  @Get('all')
  getAllReservations() {
    return this.reservationsService.getAllReservartions()
  }


  @Get('userId/:userId')
  getReservationByUserId(@Param('userId') userId: string) {
    return this.reservationsService.getReservationByUserId({ userId })
  }




}
