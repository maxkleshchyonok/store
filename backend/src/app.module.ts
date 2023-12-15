import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './app/user/user.module';
import { PrismaModule } from './libs/prisma/prisma.module';
import { AuthModule } from './app/auth/auth.module';
import { ProductModule } from './app/product/product.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { OrderItemModule } from './app/order-item/order-item.module';
import { OrderModule } from './app/order/order.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    ProductModule,
    OrderItemModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
