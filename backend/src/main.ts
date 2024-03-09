import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const whitelist = process.env.WHITE_LIST.split(',');

  app.enableCors({
    origin: whitelist,
    // origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const config = new DocumentBuilder()
    .setTitle('Youtube-Clone API')
    .setDescription('Youtube-Clone API description')
    .setVersion('1.0')
    .addBearerAuth() // usar @ApiBearerAuth() en los controladores que requieran autenticacion en swagger
    .addTag('video')
    .addTag('user')
    .addTag('auth')
    .addTag('history')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  /* SwaggerModule.setup('docs', app, document) 'api' es la ruta donde tendremos la documentacion */

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT);
}
bootstrap();
