import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, HttpStatus, Res, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { MobilesService } from './mobiles.service';
import { CreateMobileDto } from './dto/create-mobile.dto';
import { UpdateMobileDto } from './dto/update-mobile.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('api/mobiles')
export class MobilesController {

  constructor(private readonly mobilesService: MobilesService) { }



  @Post('create')
  @ApiOperation({ summary: 'Create a new mobile' })
  @ApiResponse({ status: 201, description: 'mobile created successfully' })

  @UseInterceptors(FilesInterceptor('images', 4, {
    storage: diskStorage({
      destination: './public/uploads/mobiles',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${uniqueSuffix}${ext}`);
      },
    }),
  }))


  @UsePipes(new ValidationPipe({ transform: true })) // Enable validation and transformation
  async create(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createMobileDto: CreateMobileDto,
    @Res() res: Response,
    @Req() req: Request
  ) {
    try {
      console.log('data=>', req.body);

      // Generate full image URLs
      const imageUrls = images.map((image) => `http://localhost:5000/public/uploads/mobiles/${image.filename}`);

      // Add image URLs to the DTO
      createMobileDto.images = imageUrls;
      createMobileDto.categoryIds = [3]

      // Save mobile data to the database
      const mobile = await this.mobilesService.create(createMobileDto);

      return res.status(201).json({
        statusCode: 201,
        data: mobile,
        message: "Mobile created successfully..."
      });
    } catch (error) {
      console.error("Error creating mobile:", error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }



  // const imageUrls = images.map((image) => `http://localhost:3000/public/uploads/mobiles/${image.filename}`);

  // // Add image URLs to the DTO
  // createMobileDto.images = imageUrls;

  @Get('all')
  @ApiOperation({ summary: "find mobiles with categoris" })
  @ApiResponse({ status: 200, description: 'find all mobiles' })
  async findAll(@Res() res: Response) {
    const mobiles = await this.mobilesService.findAll();

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: mobiles,
      message: "all mobiles with categories"
    })
  }


  @Get(':id')

  @ApiOperation({ summary: "get mobile by id " })
  @ApiResponse({ status: 200, description: "find mobile by id " })
  async findOne(@Param('id') id: string, @Res() res: Response) {

    const mobile = await this.mobilesService.findOne(+id);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: mobile,
      message: "find the mobile with sepecs"
    })
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMobileDto: UpdateMobileDto) {
    return this.mobilesService.update(+id, updateMobileDto);

  }

  @Delete(':id')
  @ApiOperation({summary:'delete any mobile with relatioships'})
  @ApiResponse({status:200,description:'delete'})
  remove(@Param('id') id: string, @Res() res: Response) {


    const mobile = this.mobilesService.remove(+id);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: mobile,
      message: "delete mobile successfully"
    })
  }

}
