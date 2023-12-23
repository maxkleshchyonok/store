import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderForm } from './domain/createOrder.form';
import { OrderItemForm } from '../order-item/domain/order-item.form';
import { UpdateOrderForm } from './domain/updateOrder.form';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderForm: CreateOrderForm) {
    return this.orderService.create(createOrderForm, createOrderForm.items);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderForm: UpdateOrderForm ) {
    return this.orderService.update(+id, updateOrderForm, updateOrderForm.itemId, updateOrderForm.item);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
