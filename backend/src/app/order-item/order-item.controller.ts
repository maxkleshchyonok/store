import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemForm } from './domain/order-item.form';
import { UpdateOrderItemForm } from './domain/update-order-item.form';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  create(@Body() orderItemForm: OrderItemForm, id: number) {
    return this.orderItemService.create(id, orderItemForm);
  }

  @Get()
  findAll() {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderItemService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderItemForm: UpdateOrderItemForm) {
  //   return this.orderItemService.update(+id, updateOrderItemForm);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItemService.remove(+id);
  }
}
