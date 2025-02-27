import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Res, Req, UploadedFiles } from '@nestjs/common';
import { AccessoriesService } from './accessories.service';
import { CreateAccessoryDto } from './dto/create-accessory.dto';
import { UpdateAccessoryDto } from './dto/update-accessory.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';

@Controller('api/accessories')
export class AccessoriesController {
  constructor(private readonly accessoriesService: AccessoriesService) { }

  @Post('create')

  @UseInterceptors(FilesInterceptor('images', 3, {
    storage: diskStorage({
      destination: './public/uploads/accessory',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${uniqueSuffix}${ext}`);
      },
    }),
  }))


  async create(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createAccessoryDto: CreateAccessoryDto,
    @Res() res: Response,
    @Req() req: Request
  ) {
    try {
    

      createAccessoryDto.price = Number(createAccessoryDto.price);
      createAccessoryDto.stock = Number(createAccessoryDto.stock);
      
      createAccessoryDto.categoryIds=[4]
   
      if (isNaN(createAccessoryDto.price) || isNaN(createAccessoryDto.stock)) {
        return res.status(400).json({ message: 'Price and Stock must be valid numbers' });
      }

      if (!Number.isInteger(createAccessoryDto.stock)) {
        return res.status(400).json({ message: 'Stock must be an integer ok' });
      }

      // ✅ Generate full image URLs
      const imageUrls = images.map((image) => `http://localhost:3000/public/uploads/accessory/${image.filename}`);

      // Add image URLs to the DTO
      createAccessoryDto.images = imageUrls;
      // ✅ Save mobile data to the database
      const mobile = await this.accessoriesService.create(createAccessoryDto);

      return res.status(201).json({
        statusCode: 201,
        data: mobile,
        message: "accesseries created successfully..."
      });

    } catch (error) {
      console.error("Error creating ecessories:", error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }


 

  @Get()
async findAll(@Res() res:Response) {

    const accesseries= await this.accessoriesService.findAll();

    return res.status(201).json({
      statusCode: 201,
      data: accesseries,
      message: "all accessiores..."
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccessoryDto: UpdateAccessoryDto) {
    return this.accessoriesService.update(+id, updateAccessoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessoriesService.remove(+id);
  }
}
