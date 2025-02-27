import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, UseGuards, UnauthorizedException, Req, Res } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { Response } from 'express';

@Controller('api/stories')
export class StoriesController {

  constructor(private readonly storiesService: StoriesService) { }


  @Post('create')
  @UseGuards(JwtAuthGuard) //protected route 

  @ApiOperation({ summary: 'Create a new story' })
  @ApiResponse({ status: 201, description: 'Story created successfully' })
 

  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
        destination: './public/uploads/story', // Save files in the 'uploads' directory
        filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            callback(null, `${uniqueSuffix}${ext}`); // Generate a unique filename
        },
    }),
}))

 async create(@Res() res:Response,
    @UploadedFile() image: Express.Multer.File,

    @Body() createStoryDto: CreateStoryDto, @GetUser() user:any) {


     if(user.role=='admin'){
     
      
      const sellerId = user.sub // get from jwt token

          const story= await  this.storiesService.create(createStoryDto, sellerId,image);
          return res.status(201).json({
            status:201,
            data:story,
            message:'story created successfully',

          })
     }else{

     throw new UnauthorizedException('شما اجازه دسترسی ندارید')

     }
  }



  @Get()
  @ApiOperation({ summary: 'Get all approved stories' })
  getAllApprovedStories() {
    return this.storiesService.getAllApprovedStories();
  }

  @Get('pending')
  @ApiOperation({ summary: 'Get all pending stories (Admin Only)' })
  getPendingStories() {
    return this.storiesService.getPendingStories();
  }

  @Patch(':id/approve')
  @ApiOperation({ summary: 'Approve a story (Admin Only)' })
  approveStory(@Param('id') id: number) {
    return this.storiesService.approveStory(id);
  }

  @Get('all')
  async findAll() {
    return await this.storiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoryDto: UpdateStoryDto) {
    return this.storiesService.update(+id, updateStoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storiesService.remove(+id);
  }
}
