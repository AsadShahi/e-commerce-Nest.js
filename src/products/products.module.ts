import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Mobile } from 'src/mobiles/entities/mobile.entity';
import { Accessory } from 'src/accessories/entities/accessory.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Product, Category,Mobile,Accessory]),],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports:[ProductsService]
})
export class ProductsModule { }
