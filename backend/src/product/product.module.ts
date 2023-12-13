import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    JwtModule.register({
      secret: `${process.env.jwt_secret}`,
      signOptions: { expiresIn: '1d' }
    })
  ]
})
export class ProductModule {}
