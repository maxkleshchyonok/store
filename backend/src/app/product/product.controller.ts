import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from '../../domain/dtos/create-product.dto';
import { UpdateProductDto } from '../../domain/dtos/update-product.dto';
import { Roles } from './decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/libs/security/guards/roles.guard';
import { JwtGuard } from 'src/libs/security/guards/jwt-auth.guard';
import { Public } from './decorators/public.decorator';
import { CreateProductForm } from './domain/create-product.form';
import { UpdateProductForm } from './domain/update-product.form';

@UseGuards(JwtGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(Role.USER)
  create(@Body() product: CreateProductForm) {
    return this.productService.create(product);
  }
  
  @Get()
  @Public()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductForm: UpdateProductForm) {
    return this.productService.update(+id, updateProductForm);
  }

  @Delete(':id')
  @Roles(Role.USER)
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
