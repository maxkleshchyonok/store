import { Injectable } from "@nestjs/common";
import { Order, Order_Item } from "@prisma/client";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class OrderItemRepo {
    constructor(private prisma: PrismaService) { }

    async create(orderId: number , orderItemData: Pick<Order_Item, 'productId' | 'quantity' | 'price'>) {
        const orderItem = await this.prisma.order_Item.create({
            data: {
                orderId,
                productId: orderItemData.productId,
                quantity: orderItemData.quantity,
                price: orderItemData.price

            },
            include: {
                product: true
            }
        });
        return orderItem;
    }

    async findAll() {
        return this.prisma.order_Item.findMany();
    }

    async findOne(id: number) {
        return this.prisma.order_Item.findUnique({ where: { id } });
    }

    async update(id: number, data: Partial<Pick<Order_Item, 'productId' | 'price' | 'quantity'>>) {
        return this.prisma.order_Item.update({
            where: { id },
            data: {
                ...data
            }
        });
    }

    async remove(id: number) {
        return this.prisma.order_Item.delete({ where: { id } });
    }

}