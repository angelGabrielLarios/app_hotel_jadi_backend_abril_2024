import { Module } from '@nestjs/common';
import { BedroomsService } from './bedrooms.service';
import { BedroomsController } from './bedrooms.controller';
import { Bedroom } from './entities/bedroom.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Bedroom])],
  controllers: [BedroomsController],
  providers: [BedroomsService],
  exports: [BedroomsService]
})
export class BedroomsModule { }