import { OrderRepo } from 'src/domain/repos/order.repo';
import { CreateOrderForm } from './domain/createOrder.form';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Order, Order_Item } from '@prisma/client';
import { OrderItemRepo } from 'src/domain/repos/order-item.repo';
import { UserRepo } from 'src/domain/repos/user.repo';
import { OrderStatus } from 'src/enums/orderStatus.enum';
import { ProductRepo } from 'src/domain/repos/product.repo';

@Injectable()
export class OrderService {

  constructor(
    private orderRepo: OrderRepo,
    private orderItemRepo: OrderItemRepo,
    private userRepo: UserRepo,
    private productRepo: ProductRepo
  ) { }

  async create(orderData: Pick<Order, 'userId' | 'totalPrice'>,
    orderItems: Pick<Order_Item, 'productId' | 'price' | 'quantity'>) {

    const user = await this.findMyUser(orderData.userId);

    if (user.user.orders.length) {
      const userOrder = user.user.orders.find(order => order.status === OrderStatus.ACTIVE);
      if (userOrder) { 
        throw new InternalServerErrorException('You already have active order!');
      }
    }

    const newOrder = await this.orderRepo.create(orderData);

    return await this.orderItemRepo.create(newOrder.id, orderItems);
  }

  async findAll() {
    return await this.orderRepo.getAll();
  }

  async findOne(id: number) {
    return await this.orderRepo.findOne(id);
  }

  async update(orderId: number, updateData: Partial<Pick<Order, 'totalPrice' | 'status'>>,
    itemId: number,
    updateItem: Partial<Pick<Order_Item, 'productId' | 'price' | 'quantity'>>) {

    if (updateData.status || updateData.totalPrice) {
      this.orderRepo.update(orderId, updateData);
    }

    const dbItem = await this.productRepo.findOne(updateItem.productId);
    
    if (updateItem.quantity > dbItem.amount) {
      throw new InternalServerErrorException('Incorrect items amount! Check your order.')
    }

    if (updateItem.price / updateItem.quantity !== dbItem.price) {
      throw new InternalServerErrorException('Incorret price! Check your order.')
    }

    this.orderItemRepo.update(itemId, updateItem);

    this.productRepo.update(updateItem.productId, (dbItem.amount - updateItem.quantity));

    return 'Order updated!'
  }

  async remove(id: number) {
    return await this.orderRepo.delete(id);
  }

  async findMyUser(id: string) {
    return await this.userRepo.getMyUser(id);
  }


}
