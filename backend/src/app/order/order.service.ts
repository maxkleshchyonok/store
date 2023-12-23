import { OrderRepo } from 'src/domain/repos/order.repo';
import { CreateOrderForm } from './domain/createOrder.form';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Order, Order_Item, Product } from '@prisma/client';
import { OrderItemRepo } from 'src/domain/repos/order-item.repo';
import { UserRepo } from 'src/domain/repos/user.repo';
import { OrderStatus } from 'src/enums/orderStatus.enum';
import { ProductRepo } from 'src/domain/repos/product.repo';
import { log } from 'console';

@Injectable()
export class OrderService {

  constructor(
    private orderRepo: OrderRepo,
    private orderItemRepo: OrderItemRepo,
    private userRepo: UserRepo,
    private productRepo: ProductRepo
  ) { }

  async create(orderData: Pick<Order, 'userId'>,
    orderItem: Pick<Order_Item, 'productId' | 'price' | 'quantity'>) {

    const user = await this.findMyUser(orderData.userId);

    if (user.user.orders.length) {
      const userOrder = user.user.orders.find(order => order.status === OrderStatus.ACTIVE);
      if (userOrder) {
        const orderItems = await this.orderItemRepo.findByOrder(userOrder.id);
        const currentItem = orderItems.find(item => item.productId === orderItem.productId);
        if (!currentItem) {
          return this.createNewOrderItem(userOrder.id, userOrder.totalPrice, orderItem);
        }
        const updateData: Partial<Pick<Order, 'totalPrice' | 'status'>> = {
          totalPrice: this.calculatePrice(currentItem.price, orderItem.price, userOrder.totalPrice),
          status: OrderStatus.ACTIVE,
        }
        return this.update(userOrder.id, updateData, currentItem.id, orderItem);
      }
    }

    const newOrderData: Pick<Order, 'userId' | 'totalPrice'> = {
      userId: orderData.userId,
      totalPrice: orderItem.price
    }

    const newOrder = await this.orderRepo.create(newOrderData);

    return await this.orderItemRepo.create(newOrder.id, orderItem);
  }

  async findAll() {
    return await this.orderRepo.getAll();
  }

  async findOne(id: string) {
    return await this.orderRepo.findOne(id);
  }

  async update(orderId: number, updateData: Partial<Pick<Order, 'totalPrice' | 'status'>>,
    itemId: number,
    updateItem: Partial<Pick<Order_Item, 'productId' | 'price' | 'quantity'>>) {

    if (updateData.status || updateData.totalPrice) {
      this.orderRepo.update(orderId, updateData);
    }

    const dbItem = await this.getProduct(updateItem.productId);

    const isOk = this.checkAmountAndPrice(updateItem.quantity, updateItem.price, dbItem);
    if (isOk) {
      this.orderItemRepo.update(itemId, updateItem);
    }

    //this.productRepo.update(updateItem.productId, (dbItem.amount - updateItem.quantity));

    return 'Order updated!'
  }

  async createNewOrderItem(orderId: number, totalPrice: number, item: Pick<Order_Item, 'productId' | 'quantity' | 'price'>) {
    const dbItem = await this.getProduct(item.productId);
    const isOk = this.checkAmountAndPrice(item.quantity, item.price, dbItem);
    if (isOk) {
      const updateData: Partial<Order> = {
        totalPrice: totalPrice + item.price,
      }
      await this.orderRepo.update(orderId, updateData);
      return await this.orderItemRepo.create(orderId, item);
    }
  }

  async remove(id: number) {
    return await this.orderRepo.delete(id);
  }

  async findMyUser(id: string) {
    return await this.userRepo.getMyUser(id);
  }

  async getProduct(productId: number) {
    return await this.productRepo.findOne(productId);
  }

  checkAmountAndPrice(quantity: number, price: number, item: Product) {
    if (quantity > item.amount) {
      throw new InternalServerErrorException('Incorrect items amount! Check your order.')
    }
    if (price / quantity !== item.price) {
      throw new InternalServerErrorException('Incorret price! Check your order.')
    }
    return true;
  }

  calculatePrice(prevPrice: number, newPrice: number, totalPrice: number) {
    if (prevPrice < newPrice) {
      return (totalPrice + newPrice - prevPrice)
    }
    if (newPrice < prevPrice) {
      return (totalPrice - prevPrice + newPrice)
    }
  }


}
