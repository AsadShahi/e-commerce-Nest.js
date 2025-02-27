import { Module } from '@nestjs/common';
import { MobilesService } from './mobiles.service';
import { MobilesController } from './mobiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mobile } from './entities/mobile.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Mobile,Category,Product])],
  controllers: [MobilesController],
  providers: [MobilesService],
})
export class MobilesModule {}
