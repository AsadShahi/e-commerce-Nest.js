import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
import { TicketsModule } from './tickets/tickets.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { StoriesModule } from './stories/stories.module';
import { MobilesModule } from './mobiles/mobiles.module';
import { AccessoriesModule } from './accessories/accessories.module';

import { OrdersModule } from './orders/orders.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CommentsModule } from './comments/comments.module';
import { StoresModule } from './stores/stores.module';
import { DepartmentsModule } from './departments/departments.module';
import { JwtModule } from '@nestjs/jwt';
import { WishlistsModule } from './wishlists/wishlists.module';

@Module({
  imports: [
    // global configs
    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: '.env'
      }),

    // db configs
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.localhost,
      port: +process.env.DB_PORT,
     
      
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],

      synchronize: true


    }),
    // modules
    UsersModule,
    AuthModule,
    JwtModule,
    AddressModule,
    TicketsModule,
    ProductsModule,
    CategoriesModule,
    StoriesModule,
    MobilesModule,
    AccessoriesModule,
    

    OrdersModule,

    NotificationsModule,

    CommentsModule,

    StoresModule,

    DepartmentsModule,

    WishlistsModule],


  controllers: [],
  providers: [],
})
export class AppModule { }
