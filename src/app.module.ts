import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
import { TicketsModule } from './tickets/tickets.module';
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
    AddressModule,
    TicketsModule],

  controllers: [],
  providers: [],
})
export class AppModule { }
