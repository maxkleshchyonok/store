import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { OrderItemRepo } from 'src/domain/repos/order-item.repo';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService, OrderItemRepo, PrismaService],
  imports: [
    JwtModule.register({
      secret: `${process.env.jwt_secret}`,
      signOptions: { expiresIn: '5m' }
    })
  ]
})
export class OrderItemModule { }
