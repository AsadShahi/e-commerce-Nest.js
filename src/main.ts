import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  //enable coocki parser
  app.use(cookieParser()) //enable 

  // enable course
  app.enableCors({
    origin:'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials:true
  
  })

  app.useGlobalPipes(new ValidationPipe())

  
  app.useStaticAssets(join(__dirname, '..', 'public' ,'uploads'), {
    prefix: '/public/uploads',
});




  const config = new DocumentBuilder()
    .setTitle('Mobile Store API')
    .setDescription('API documentation for Mobile Store')
    .setVersion('1.0')
    .addTag('MobileStore')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
