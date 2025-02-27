import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Product } from 'src/products/entities/product.entity';
import { Mobile } from 'src/mobiles/entities/mobile.entity';
import { Accessory } from 'src/accessories/entities/accessory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Product,Mobile,Accessory])],
  controllers: [CommentsController],
  providers: [CommentsService],
})


export class CommentsModule { }
