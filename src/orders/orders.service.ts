import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OrdersService {

  constructor(@InjectRepository(Order)
   private readonly orderRepository:Repository<Order>,
   @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}


   async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, ...orderData } = createOrderDto;


    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const order = this.orderRepository.create({
      ...orderData,
     
      user,   
    });

    // Save the order in the database
    return await this.orderRepository.save(order);
  }
  async findAll() {
    return await this.orderRepository.find({relations:['user']})
  }

  async findOne(id: number) {
    return await this.orderRepository.findOne({where:{id}})
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }



  async updateStatus(id: number, updateStatusDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.status = updateStatusDto.status;
    return await this.orderRepository.save(order);
  }


  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
