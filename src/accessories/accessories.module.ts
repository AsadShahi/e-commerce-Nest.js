import { Module } from '@nestjs/common';
import { AccessoriesService } from './accessories.service';
import { AccessoriesController } from './accessories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accessory } from './entities/accessory.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({

   imports: [TypeOrmModule.forFeature([Accessory,Category,Product])],

   controllers: [AccessoriesController],
   providers: [AccessoriesService],
})
export class AccessoriesModule { }
