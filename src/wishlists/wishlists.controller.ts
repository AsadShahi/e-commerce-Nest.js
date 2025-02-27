// wishlist.controller.ts
import { Controller, Post, Get, Delete, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { WishlistsService } from './wishlists.service';
import { ProductsService } from 'src/products/products.service';

@Controller('wishlist')

export class WishlistsController {
  constructor(
    private wishlistService: WishlistsService,
    private productService: ProductsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':productId')
  async addToWishlist(@Param('productId') productId: number, @Req() req) {
    const product = await this.productService.findOne(productId);
    return this.wishlistService.addToWishlist(req.user, product);
  }

  @Get()
  async getWishlist(@Req() req) {
    return this.wishlistService.findWishlistByUser(req.user);
  }

  @Delete(':productId')
  async removeFromWishlist(@Param('productId') productId: number, @Req() req) {
    return this.wishlistService.removeFromWishlist(req.user, productId);
  }
}
