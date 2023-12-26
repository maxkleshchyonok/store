import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderForm } from './domain/createOrder.form';
import { OrderItemForm } from '../order-item/domain/order-item.form';
import { UpdateOrderForm } from './domain/updateOrder.form';
import { JwtGuard } from 'src/libs/security/guards/jwt-auth.guard';
import { Roles } from '../product/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@UseGuards(JwtGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @HttpCode(200)
  @Post()
  create(@Body() createOrderForm: CreateOrderForm) {
    return this.orderService.create(createOrderForm, createOrderForm.items);
  }

  @HttpCode(200)
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @HttpCode(200)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderForm: UpdateOrderForm ) {
    return this.orderService.update(+id, updateOrderForm, updateOrderForm.itemId, updateOrderForm.item);
  }

  @HttpCode(200)
  @Patch('status/:id')
  updateStatus(@Param('id') id: string) {
    return this.orderService.updateStatus(+id);
  }

  @HttpCode(200)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
