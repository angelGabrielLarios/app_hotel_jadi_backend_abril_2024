import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BedroomsModule } from './bedrooms/bedrooms.module';
import { ReservationsModule } from './reservations/reservations.module';
import { EmailModule } from './email/email.module';
import { User } from './users/entities/user.entity';
import { Bedroom } from './bedrooms/entities/bedroom.entity';
import { Reservation } from './reservations/entities/reservation.entity';
import { BedroomTypeModule } from './bedroom-type/bedroom-type.module';
import { BedroomType } from './bedroom-type/entities/bedroom-type.entity';
import { PaypalModule } from './paypal/paypal.module';
import { ConfigModule } from '@nestjs/config';
import { PasswordResetTokenModule } from './password-reset-token/password-reset-token.module';
import { PasswordResetToken } from './password-reset-token/entities/password-reset-token.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'app_hotel',
      entities: [User, Bedroom, Reservation, BedroomType, PasswordResetToken],
      synchronize: true,

    }),
    UsersModule,
    AuthModule,
    BedroomsModule,
    ReservationsModule,
    EmailModule,
    BedroomTypeModule,
    PaypalModule,
    PasswordResetTokenModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
