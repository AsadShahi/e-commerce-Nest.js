import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, UploadedFile, Req, } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Controller('api/stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) { }

  @Post('create')


  @UseInterceptors(FileInterceptor('logo', {

    storage: diskStorage({
      destination: './public/uploads/logo',
      filename: (req, file, calaback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname)

        calaback(null, `${uniqueSuffix}${ext}`);

      }
    }),


  }))

  async create(@Req() request, @UploadedFile() logo: Express.Multer.File, @Body() createStoreDto: CreateStoreDto, @Res() res: Response) {
    console.log("Authenticated User =>", request.user);
    createStoreDto.sellerId = 1 //it should get from authinticated user
    createStoreDto.logo = logo
    // Assuming you want to save the logo's filename or path in your store record

    const store = await this.storesService.create(createStoreDto);

    return res.status(201).json({
      status: 201,
      data: store,
      message: "Store created succssefully"
    })


  }

  @Get()
  async findAll(@Res() res: Response) {
    const store = await this.storesService.findAll();


    return res.status(200).json({
      status: 200,
      data: store,
      message: "all store finds"
    })

  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const store = await this.storesService.findOne(+id);

    return res.status(200).json({
      status: 200,
      data: store,
      message: "store finds"
    })


  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storesService.remove(+id);
  }
}
