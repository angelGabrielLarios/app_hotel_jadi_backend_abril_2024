import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { Reservation } from './entities/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BedroomsModule } from 'src/bedrooms/bedrooms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    BedroomsModule
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],

})
export class ReservationsModule { }