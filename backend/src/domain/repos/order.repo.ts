import { Injectable } from '@nestjs/common';
import { Order, Order_Item } from '@prisma/client';
import { OrderStatus } from 'src/enums/orderStatus.enum';
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class OrderRepo {
    constructor(private prisma: PrismaService) { }

    async create(orderData: Pick<Order, 'userId' | "totalPrice">) {
        const order = this.prisma.order.create({
            data: {
                userId: orderData.userId,
                totalPrice: orderData.totalPrice,
                status: OrderStatus.ACTIVE
            },
            include: {
                items: true
            }
        });
        return order;
    }

    getAll() {
        return this.prisma.order.findMany({
            include: {
                items: true
            }
        });
    }

    findOne(id: number) {
        return this.prisma.order.findUnique({ where: { id } });
    }

    update(id: number, updateData: Partial<Pick<Order, 'totalPrice' | 'status'>>) {
        try {
            const updatedOrder = this.prisma.order.update({
                where: { id },
                data: updateData
            });
            return updatedOrder;
        } catch (error) {
            console.error("Error updating order:", error);
            throw error;
        }
    }

    delete(id: number) {
        return this.prisma.order.delete({ where: { id } });
    }
}