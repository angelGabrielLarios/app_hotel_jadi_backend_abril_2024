import { Controller, Get, Param, } from '@nestjs/common';
import { BedroomTypeService } from './bedroom-type.service';


@Controller('bedroom-type')
export class BedroomTypeController {
  constructor(private readonly bedroomTypeService: BedroomTypeService) { }


  @Get()
  findAll() {
    return this.bedroomTypeService.findAll()
  }

  @Get('type/:type')
  getPriceByType(@Param('type') type: string) {
    return this.bedroomTypeService.getPriceByType({ type })
  }

  @Get('id/:id')
  findById(@Param('id') id: string) {
    return this.bedroomTypeService.findOneById({ id });
  }





}
