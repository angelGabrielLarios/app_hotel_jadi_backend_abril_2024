import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { BedroomsService } from './bedrooms.service';
import { UpdateStatusByNumberBedroom } from './dto/update-status-by-number-bedroom.dto';
/* import { CreateBedroomDto } from './dto/create-bedroom.dto'; */
/* import { UpdateBedroomDto } from './dto/update-bedroom.dto'; */

@Controller('bedrooms')
export class BedroomsController {
  constructor(private readonly bedroomsService: BedroomsService) { }

  @Get()
  findAll() {
    return this.bedroomsService.findAll()
  }

  @Get('bedroom-available-by-type/:type')
  findOneByType(@Param('type') type: string) {
    return this.bedroomsService.findOneByType({ type })
  }

  @Get('statistics')
  getStatistics() {
    return this.bedroomsService.getStatistics()
  }

  @Patch('update-status')
  updateStatusByNumberBedroom(@Body() updateStatusByNumberBedroom: UpdateStatusByNumberBedroom) {
    const { num_bedroom, status } = updateStatusByNumberBedroom
    return this.bedroomsService.updateStatusByNumberBedroom({ num_bedroom, status })

  }
}
