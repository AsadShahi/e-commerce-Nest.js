import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard)
  async update(@Req() req, @GetUser() user: any, @Res() res: Response, @Body() updateUserDto: UpdateUserDto) {
    console.log(req.body)

    const id = user.id
    console.log('updateUserDto=>', updateUserDto)


    const userInfo = await this.usersService.update(id, updateUserDto);


    return res.status(201).json({
      status: 200,
      data: userInfo,
      message: 'user updated sucsessfully'
    })

  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
