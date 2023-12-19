import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { OrderItemForm } from './domain/order-item.form';
import { Order_Item } from '@prisma/client';
import { OrderItemRepo } from 'src/domain/repos/order-item.repo';
import { UpdateOrderItemForm } from './domain/update-order-item.form';

@Injectable()
export class OrderItemService {

  constructor(
    private prisma: PrismaService,
    private orderItemRepo: OrderItemRepo
  ) { }

  async create(id: number, data: Pick<Order_Item, 'productId' | 'quantity' | 'price'>) {

    const { productId, quantity, price } = data;

    const orderItemData = {
      productId,
      quantity,
      price
    }

    return await this.orderItemRepo.create(id, orderItemData);
  }

  async findAll() {
    return await this.orderItemRepo.findAll();
  }

  async findOne(id: number) {
    return await this.orderItemRepo.findOne(id);
  }

  // async update(id: number, updateOrderItemForm: UpdateOrderItemForm) {
  //   return await this.orderItemRepo.update(id, updateOrderItemForm);
  // }

  async remove(id: number) {
    return await this.orderItemRepo.remove(id);
  }

}
