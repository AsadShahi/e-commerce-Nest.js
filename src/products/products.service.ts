import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly serviceProduct: Repository<Product>,

    @InjectRepository(Category)
    private readonly serviceCategory: Repository<Category>
  ) { }

  async create(createProductDto: CreateProductDto) {

    return null
    const { name, brand, price, stock, short_description, long_description, categoryIds, images } = createProductDto;

    // Create the product
    const product = this.serviceProduct.create({
      name,
      brand,
      price,
      stock,
      short_description,
      long_description,
     
    });

    // Assign categories if provided
    if (categoryIds) {
      const categories = await this.serviceCategory.findBy({ id: In(categoryIds) });
      product.categories = categories;
    }

    return await this.serviceProduct.save(product);
  }


  async findAll() {
    return await this.serviceProduct.find({ relations: ['categories'] })

  }
  

  async findOne(id: number) {
    const product = await this.serviceProduct.findOne({ where: { id }, relations: ['categories','mobiles','accessories'] })
    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { name, brand, price, stock, short_description, long_description, categoryIds, images } = updateProductDto;

    // Find the product
    const product = await this.serviceProduct.findOne({ where: { id } });

    // Update product fields
    if (name) product.name = name;
    if (brand) product.brand = brand;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (short_description) product.short_description = short_description;
    if (long_description) product.long_description = long_description;

    // Update categories if provided
    if (categoryIds) {
      const categories = await this.serviceCategory.findBy({ id: In(categoryIds) });
      product.categories = categories;
    }

    return await this.serviceProduct.save(product);
  }


  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
