import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { JwtModule } from '@nestjs/jwt';
import { ProductRepo } from 'src/domain/repos/product.repo';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductRepo, PrismaService],
  imports: [
    JwtModule.register({
      secret: `${process.env.jwt_secret}`,
      signOptions: { expiresIn: '1d' }
    })
  ]
})
export class ProductModule {}
