import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { OrderItemRepo } from 'src/domain/repos/order-item.repo';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService, OrderItemRepo, PrismaService],
})
export class OrderItemModule {}
