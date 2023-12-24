import { Injectable } from '@nestjs/common';
import { Order, Order_Item } from '@prisma/client';
import { OrderStatus } from 'src/enums/orderStatus.enum';
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class OrderRepo {
    constructor(private prisma: PrismaService) { }

    async create(orderData: Pick<Order, 'userId' | "totalPrice">) {
        const order = await this.prisma.order.create({
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

    async getAll() {
        return await this.prisma.order.findMany({
            include: {
                items: true
            }
        });
    }

    async findOne(userId: string) {
        const order = await this.prisma.order.findFirst({
            where: {
                userId: userId,
                status: OrderStatus.ACTIVE
            },
            include: {
                items: true
            }
        })
        if (!order) {
            return false;
        }
        return order;
    }

    async updateOrderById(id: number, status: string) {
        try {
            return await this.prisma.order.update({
                where: {id},
                data: {
                    status: status
                }
            });
        } catch (error) {
            throw new Error('Error with updating status')
        }
    }

    async update(id: number, updateData: Partial<Pick<Order, 'totalPrice' | 'status'>>) {
        try {
            const updatedOrder = await this.prisma.order.update({
                where: { id },
                data: {
                    status: updateData.status,
                    totalPrice: updateData.totalPrice
                }
            });
            return updatedOrder;
        } catch (error) {
            throw new Error('Error updating order');
        }
    }

    async delete(id: number) {
        return await this.prisma.order.delete({ where: { id } });
    }
}