import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  //App with Nest Express Application Type
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //Enabled Cors
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  //Swagger Config
  let swaggerConfig = new DocumentBuilder()
    .setTitle('KBC')
    .setDescription('KBC Quiz API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('kbc', app, document);

  //Async App Start on 3000 Port
  await app.listen(3030);
}
bootstrap();
