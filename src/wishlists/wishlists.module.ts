import { Module } from '@nestjs/common';
import { WishlistsController } from './wishlists.controller';
import { WishlistsService } from './wishlists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { ProductsService } from 'src/products/products.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { ProductsModule } from 'src/products/products.module';



@Module({
  imports: [TypeOrmModule.forFeature([Wishlist, Product, User]),
    AuthModule,
    ProductsModule],
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export class WishlistsModule { }
