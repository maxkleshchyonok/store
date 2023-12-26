import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepo } from 'src/domain/repos/order.repo';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { OrderItemRepo } from 'src/domain/repos/order-item.repo';
import { UserRepo } from 'src/domain/repos/user.repo';
import { ProductRepo } from 'src/domain/repos/product.repo';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepo,
    PrismaService,
    OrderItemRepo,
    UserRepo,
    ProductRepo,
  ],
  imports: [
    JwtModule.register({
      secret: `${process.env.jwt_secret}`,
      signOptions: { expiresIn: '5m' }
    })
  ]
})
export class OrderModule { }
