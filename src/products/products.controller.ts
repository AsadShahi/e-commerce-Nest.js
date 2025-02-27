import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }


  @Post()
  @UseInterceptors(FilesInterceptor('images', 5, { // Allow up to 5 images
    storage: diskStorage({
      destination: './public/uploads/mobiles', // Save files in the 'uploads' directory
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${uniqueSuffix}${ext}`); // Generate a unique filename
      },
    }),
  }))

  async create(@UploadedFiles() images: Express.Multer.File[], @Body() createProductDto: CreateProductDto, @Res() res: Response) {
    console.log('images=>', images)

    // Map uploaded files to their URLs
    const imageUrls = images.map((image) => `http://localhost:3000/public/uploads/mobiles/${image.filename}`);
    // Add image URLs to the DTO
    createProductDto.images = imageUrls;

    const product = await this.productsService.create(createProductDto);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: product,
      message: "product created successfully..."
    })

  }


  @Get()
  async findAll(@Res() res: Response) {
    const products = await this.productsService.findAll();
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: products,
      message: "all products"
    })
  }

  @Get('productById/:id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const product = await this.productsService.findOne(+id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: product,
      message: "product find"
    })
  }



  // udate any mobile infos
  @Put(':id')
  @UseInterceptors(FilesInterceptor('images', 10, { // Allow up to 10 images
    storage: diskStorage({
      destination: './public/uploads/mobiles', // Save files in the 'uploads' directory
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${uniqueSuffix}${ext}`); // Generate a unique filename
      },
    }),
  }))
  async update(
    @Param('id') id: string,
    @UploadedFiles() images: Express.Multer.File[], // Handle multiple files
    @Body() updateProductDto: UpdateProductDto,
    @Res() res: Response,
  ) {
    // Map uploaded files to their URLs
    const imageUrls = images.map((image) => `http://localhost:3000/public/uploads/mobiles/${image.filename}`);

    // Add image URLs to the DTO
    updateProductDto.images = imageUrls;

    // Update the product
    const product = await this.productsService.update(+id, updateProductDto);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: product,
      message: 'Product updated successfully...',
    });
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
