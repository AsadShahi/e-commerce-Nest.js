import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Response } from 'express';
import { Order } from './entities/order.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Body() createOrderDto: CreateOrderDto,@Res() res:Response,@GetUser() user:any) {
    createOrderDto.userId=user.id

    const order= await this.ordersService.create(createOrderDto);

    return res.status(201).json({
      status: 201,
      data: order,
      message: "Order created successfully..."
    })

  }

  @Get('all')
 async findAll(@Res() res:Response) {

    const orders = await this.ordersService.findAll();

    return res.status(200).json({
      statusCode:200,
      data: orders,
      message: "Order lists..."
    })
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateOrderDto): Promise<Order> {
    return this.ordersService.updateStatus(+id, updateStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
