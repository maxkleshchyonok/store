import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Injectable()
export class OrderItemService {

  constructor(private prisma: PrismaService) { }

  async create(createOrderItemDto: CreateOrderItemDto) {
    const { orderId, productId, quantity, price } = createOrderItemDto;

    const orderItem = await this.prisma.order_Item.create({
      data: {
        orderId,
        productId,
        quantity,
        price
      }
    });
    return orderItem;
  }

  findAll() {
    return `This action returns all orderItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderItem`;
  }

  update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return `This action updates a #${id} orderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderItem`;
  }

  async checkOrder(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderId,
      }
    });
    // if (!order) {
    //   const newOrder = await this.prisma.order.create({
    //     data: {

    //     }
    //   });
    // }
  }
}
