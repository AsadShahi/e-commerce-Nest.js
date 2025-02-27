import { Injectable } from '@nestjs/common';
import { CreateMobileDto } from './dto/create-mobile.dto';
import { UpdateMobileDto } from './dto/update-mobile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mobile } from './entities/mobile.entity';
import { In, Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductType } from 'src/products/enum/ProductEnumTypes';

@Injectable()
export class MobilesService {

  constructor(@InjectRepository(Mobile)


  private readonly mobileRepository: Repository<Mobile>,


    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,


    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>

  ) { }



  async create(createMobileDto: CreateMobileDto) {
    const {
      name,
      model,
      brand,
      price,
      stock,
      short_description,
      long_description,
      categoryIds,
      images,
      specs,
      productId
    } = createMobileDto;

    let product= await this.productRepository.findOne({where:{id:productId}})

    if(!product){

      // Step 1: Create the Product entity
        product = this.productRepository.create({
        name,
        model,
        brand,
        price,
        stock,
        short_description,
        long_description,
        Product_type:ProductType.MOBILE
      
      });
  
      // Step 2: Assign categories if provided
      if (categoryIds) {
        const categories = await this.categoryRepository.findBy({
          id: In(categoryIds),
        });
        product.categories = categories;
      }
  
      // Step 3: Save the Product entity
      await this.productRepository.save(product);

    }

    // Step 4: Create the Mobile entity
    const mobile = this.mobileRepository.create({  
      baseProduct:product, 
      specs,
      images,

    });

    // Step 5: Save the Mobile entity
    return await this.mobileRepository.save(mobile);
  }





  findAll() {
    return   this.mobileRepository.createQueryBuilder('mobile')
    .leftJoinAndSelect('mobile.categories','categories')
    .getMany()
  }

  async findOne(id: number) {

  return await this.mobileRepository.createQueryBuilder('mobile')
   .leftJoinAndSelect('mobile.categories', 'categories') // Join the categories relationship
   .where('mobile.id = :id', { id })
   .getOne();

  

  }

  update(id: number, updateMobileDto: UpdateMobileDto) {
    return `This action updates a #${id} mobile`;
  }

  async remove(id: number) {
    const mobile= await this.mobileRepository.findOne({where:{id},relations:['categories']})
       
    return this.mobileRepository.remove(mobile)
  }
}
