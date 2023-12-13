import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
