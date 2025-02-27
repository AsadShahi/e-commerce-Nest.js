import { Injectable } from '@nestjs/common';
import { CreateAccessoryDto } from './dto/create-accessory.dto';
import { UpdateAccessoryDto } from './dto/update-accessory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Accessory } from './entities/accessory.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductType } from 'src/products/enum/ProductEnumTypes';

@Injectable()
export class AccessoriesService {


  constructor(
    @InjectRepository(Accessory)
  private readonly accessoryRepository: Repository<Accessory>,
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>,
  @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>

) { }



  

async create(createAccessoryDto: CreateAccessoryDto) {
  const {
    name,
    model,
    brand,
    type,
    price,
    stock,
    short_description,
    long_description,
    categoryIds,
    images,
  } = createAccessoryDto;

  const product = this.productRepository.create({
    name,
    model,
    brand,
    price,
    stock,
    short_description,
    long_description,
    Product_type:ProductType.ACCESSORY
   
  });

 // Assign categories if provided
 if (categoryIds) {
  const categories = await this.categoryRepository.findBy({
    id: In(categoryIds),
  });
  product.categories = categories;
}
  
  // Save the Product entity
  await this.productRepository.save(product);



  // Step 1: Create the accessory entity (without categories yet)
  let accessory = this.accessoryRepository.create({
    baseProduct:product,
    type,
    images,
  });

  // ✅ Step 2: Save the accessory first to generate an ID
  accessory = await this.accessoryRepository.save(accessory);


  return accessory;
}




  



  async findAll() {
    

    return   await this.accessoryRepository.find({})
  
  }

  findOne(id: number) {
    return `This action returns a #${id} accessory`;
  }

  update(id: number, updateAccessoryDto: UpdateAccessoryDto) {
    return `This action updates a #${id} accessory`;
  }

  remove(id: number) {
    return `This action removes a #${id} accessory`;
  }
}
