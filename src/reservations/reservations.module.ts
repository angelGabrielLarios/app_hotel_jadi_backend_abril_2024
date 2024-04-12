import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { Reservation } from './entities/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BedroomsModule } from 'src/bedrooms/bedrooms.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    BedroomsModule,
    EmailModule
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],

})
export class ReservationsModule { }