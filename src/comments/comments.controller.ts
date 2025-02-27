import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Put, BadRequestException } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Response } from 'express';

@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post('create')
  async create(@Body() createCommentDto: CreateCommentDto, @Res() res: Response) {
 
    

    const comment = await this.commentsService.create(createCommentDto);

    return res.status(201).json({

      status: 201,
      data: comment,
      message: 'comment created successfully'

    })

  }

  @Get('all')
  async findAll(@Res() res: Response) {
    const comments = await this.commentsService.findAll();
    return res.status(200).json({

      status: 200,
      data: comments,
      message: 'comments finds successfully'

    })
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }




  @Get('product/:id')
  async findByProduct(@Param('id') id: string, @Res() res: Response) {
    const comment = await this.commentsService.findByProduct(+id);

    return res.status(200).json({

      status: 200,
      data: comment,
      message: 'comment find by product id successfully'

    })
  }

  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateCommentDto, @Res() res: Response) {
    const comment = await this.commentsService.updateStatus(+id, updateStatusDto);

    return res.status(200).json({

      status: 200,
      data: comment,
      message: 'comment aproved successfully'

    })

  }


  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {

    const comment = await this.commentsService.delete(+id);

    return res.status(200).json({

      status: 200,
      data: comment,
      message: 'comment deleted successfully'

    })
  }
}
