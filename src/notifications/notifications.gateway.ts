import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Server, Socket } from 'socket.io';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Notifications WebSocket') // ✅ Swagger Tag
@WebSocketGateway({ cors: true }) // Creates a WebSocket server
export class NotificationsGateway {
  @WebSocketServer()
  private server: Server;

  private clients = new Map<number, string>(); // Stores userId and socketId

  constructor(private readonly notificationsService: NotificationsService) {}

  afterInit(server: Server) {
    this.server = server;
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    for (const [userId, socketId] of this.clients.entries()) {
      if (socketId === client.id) {
        this.clients.delete(userId);
      }
    }
  }

  @SubscribeMessage('createNotification')
  @ApiOperation({ summary: 'Create a new notification (Real-time WebSocket)' })
  @ApiResponse({ status: 201, description: 'Notification created successfully' })
  async create(@MessageBody() createNotificationDto: CreateNotificationDto) {
    const notification = await this.notificationsService.create(createNotificationDto);
    const userSocketId = this.clients.get(notification.user.id);

    if (userSocketId) {
      this.server.to(userSocketId).emit('newNotification', notification);
    }

    return {
      status: 201,
      data: notification,
      message: 'Notification created successfully',
    };
  }

  @SubscribeMessage('findAllNotifications')
  @ApiOperation({ summary: 'Retrieve all notifications' })
  @ApiResponse({ status: 200, description: 'List of notifications' })
  findAll() {
    return this.notificationsService.findAll();
  }

  @SubscribeMessage('findOneNotification')
  @ApiOperation({ summary: 'Get a specific notification' })
  @ApiResponse({ status: 200, description: 'Notification details' })
  findOne(@MessageBody() id: number) {
    return this.notificationsService.findOne(id);
  }

  @SubscribeMessage('findUserNotifications')
  @ApiOperation({ summary: 'Fetch notifications for a specific user' })
  @ApiResponse({ status: 200, description: 'User notifications retrieved successfully' })
  async findUserNotifications(@MessageBody() userId: number) {
    return await this.notificationsService.findUserNotifications(userId);
  }

  @SubscribeMessage('markAsRead')
  @ApiOperation({ summary: 'Mark a notification as read' })
  @ApiResponse({ status: 200, description: 'Notification marked as read' })
  async markAsRead(@MessageBody() notificationId: number) {
    const response = await this.notificationsService.markAsRead(notificationId);
    this.server.emit('notification:update', { notificationId, isRead: true });
    return response;
  }

  @SubscribeMessage('removeNotification')
  @ApiOperation({ summary: 'Delete a notification' })
  @ApiResponse({ status: 200, description: 'Notification removed successfully' })
  remove(@MessageBody() id: number) {
    return this.notificationsService.remove(id);
  }
}
