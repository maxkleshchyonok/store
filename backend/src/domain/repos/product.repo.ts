import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Injectable()
export class ProductRepo {
    constructor(private prisma: PrismaService) { }

    async create(productData: Pick<Product, 'name' | 'description' | 'price' | 'amount' | 'category' | 'images'>) {
        const product = await this.prisma.product.create({
            data: productData
        });

        return product;
    }

    async findAll() {
        return this.prisma.product.findMany();
    }

    async findOne(id: number) {
        return this.prisma.product.findUnique({ where: { id } });
    }

    async update(id: number, amount: number) {
        return this.prisma.product.update({
            where: { id },
            data: {
                amount: amount
            }
        });
    }

    async remove(id: number) {
        return this.prisma.product.delete({ where: { id } });
    }
}