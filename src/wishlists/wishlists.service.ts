

// wishlist.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
  ) {}

  async addToWishlist(user: User, product: Product): Promise<Wishlist> {
    const existingItem = await this.wishlistRepository.findOne({ where: { user: user, product: product } });
    if (existingItem) {
      return existingItem;
    }
    const wishlistItem = new Wishlist();
    wishlistItem.user = user;
    wishlistItem.product = product;
    return await this.wishlistRepository.save(wishlistItem);
  }

  async findWishlistByUser(user: User): Promise<Wishlist[]> {
    return await this.wishlistRepository.find({ where: { user: user } });
  }

  async removeFromWishlist(user: User, productId: number): Promise<void> {
    const wishlistItem = await this.wishlistRepository.findOne({ where: { user: user, product: { id: productId } } });
    if (wishlistItem) {
      await this.wishlistRepository.remove(wishlistItem);
    }
  }
}