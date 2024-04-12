import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { CreatePaypalDto } from './dto/create-paypal.dto';
import { UpdatePaypalDto } from './dto/update-paypal.dto';

@Controller('paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) { }


  @Get('access-token')
  getAccessToken() {
    return this.paypalService.getAccessToken()
  }

  @Post('create_order')
  createOrder(@Body() { intent, amount_value }: { intent: string, amount_value: number }) {
    return this.paypalService.createOrder({ intent, amount_value })
  }

  @Post('complete_order')
  completeOrder(@Body() { intent, order_id }: { intent: string, order_id: string }) {
    return this.paypalService.completeOrder({ intent, order_id })
  }

  @Post()
  create(@Body() createPaypalDto: CreatePaypalDto) {
    return this.paypalService.create(createPaypalDto);
  }

  @Get()
  findAll() {
    return this.paypalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paypalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaypalDto: UpdatePaypalDto) {
    return this.paypalService.update(+id, updatePaypalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paypalService.remove(+id);
  }
}
