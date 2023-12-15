import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../../domain/dtos/create-product.dto';
import { UpdateProductDto } from '../../domain/dtos/update-product.dto';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { Product } from '@prisma/client';
import { ProductRepo } from 'src/domain/repos/product.repo';
import { UpdateProductForm } from './domain/update-product.form';

@Injectable()
export class ProductService {

  constructor(
    private productRepo: ProductRepo
    ) { }

  async create(product: Pick<Product, 'name' | 'description' | 'price' | 'amount' | 'category' | 'images'>) {

    const productData = {
      name: product.name,
      description: product.description,
      amount: product.amount,
      price: product.price,
      category: product.category,
      images: product.images
    }

    return this.productRepo.create(productData);
  }

  async findAll() {
    return await this.productRepo.findAll();
  }

  async findOne(id: number) {
    return await this.productRepo.findOne(id);
  }

  async update(id: number, data: Pick<Product, 'amount'>) {
    return await this.productRepo.update(id, data);
  }

  async remove(id: number) {
    return await this.productRepo.remove(id);
  }
}
