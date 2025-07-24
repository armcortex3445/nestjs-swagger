import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configPipe(app);

  attachSwagger(app);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

function attachSwagger(app : INestApplication<any>){

  const options = new DocumentBuilder()
  .setTitle('swagger example')
  .setDescription('main server API description')
  .setVersion('1.0')
  .addTag('cats')
  .addBearerAuth()
  .build();
const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api', app, document,{
  jsonDocumentUrl : 'api-json',
});
}

function configPipe(app : INestApplication<any>){

  app.useGlobalPipes(new ValidationPipe({
    transform : true,
  }));
}