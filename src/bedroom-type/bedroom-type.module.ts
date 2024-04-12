import { Module } from '@nestjs/common';
import { BedroomTypeService } from './bedroom-type.service';
import { BedroomTypeController } from './bedroom-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BedroomType } from './entities/bedroom-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BedroomType])],
  controllers: [BedroomTypeController],
  providers: [BedroomTypeService],
})
export class BedroomTypeModule { }
