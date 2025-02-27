import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Comment } from './entities/comment.entity';
import { Mobile } from 'src/mobiles/entities/mobile.entity';
import { Accessory } from 'src/accessories/entities/accessory.entity';

@Injectable()
export class CommentsService {

  constructor(

    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Mobile)
    private readonly mobileRepository: Repository<Mobile>,
    @InjectRepository(Accessory)
    private readonly accessoryRepository: Repository<Accessory>,

  ) { }

  async create(createCommentDto: CreateCommentDto) {
    console.log('createCommentDto=>', createCommentDto);

    const { username, email, body, score, productId } = createCommentDto;


    // Check if product exists
    const product = await this.productRepository.findOneBy({ id: productId })


    if (!product) {
      throw new NotFoundException(`${productId} .محصول با این ایدی پیدا نشد `);
    }

    // Create the comment
    const newComment = this.commentRepository.create({
      username,
      email,
      body,
      score,
      product, // Ensure we're passing the product object, not productId
    });



    // Ensure JSON is valid before saving
    try {
      const savedComment = await this.commentRepository.save(newComment);

      return savedComment;
    } catch (error) {
      console.error("Error saving comment:", error);
      throw new InternalServerErrorException("Error saving comment");
    }
  }



  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.find({ relations: ['product'] });
  }

  async findOne(id: number): Promise<Comment> {




    return await this.commentRepository.findOneBy({ id });

  }

  async findByProduct(productId: number): Promise<Comment[]> {
    
    // Check if the product exists
    const product = await this.productRepository.findOneBy({ id: productId });

    if (!product) {
      throw new NotFoundException(`محصول با این ایدی (${productId}) پیدا نشد.`);
    }

    return await this.commentRepository.find({ where: { product: { id: productId } }, relations: ['product'] });


  }

  async updateStatus(id: number, updateStatusDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    comment.isAccept = updateStatusDto.isAccept;
    return await this.commentRepository.save(comment);
  }

  async delete(id: number): Promise<void> {
    const comment = await this.commentRepository.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    await this.commentRepository.remove(comment);
  }
}
