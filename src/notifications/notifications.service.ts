import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class NotificationsService {


  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,

    @InjectRepository(User)
    
    private readonly userRepository: Repository<User>,
  ) { }


  async create(createNotificationDto: CreateNotificationDto) {

    const { title, message, userId } = createNotificationDto


    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }


    // Create the notification entity
    const notification = this.notificationRepository.create({
      title,
      message,
      user,

    });





    return this.notificationRepository.save(notification)

  }



  findAll() {
    return `This action returns all notifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  async remove(id: number) {

    return  await this.notificationRepository.delete(id)
    
  }


  async findUserNotifications(userId: number) {

    const user = await this.notificationRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' }
    })

    return user
  }



  async markAsRead(notificationId: number) {
    const notification = await this.notificationRepository.findOne({ where: { id: notificationId } });
  
    if (!notification) {
      throw new Error('Notification not found');
    }
  
    // Directly update using the notificationId and new value
     await this.notificationRepository.update(notificationId, { isRead: true });
  
    return await this.notificationRepository.findOne({ where: { id: notificationId } });
  }
  



}
