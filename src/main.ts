import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { INestApplication, Options, ValidationPipe } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';
import { ShowCatResponse } from './cats/dto/response/showCat.response';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configPipe(app);

  attachSwagger(app);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

function attachSwagger(app : INestApplication<any>){

  const rootOptions = new DocumentBuilder()
  .setTitle('Multiple Specification')
  .setDescription('Description for multiple')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app,rootOptions,{
    include : []
  });



  const catOptions = new DocumentBuilder()
  .setTitle('cat API')
  .setDescription('cat API description')
  .setVersion('1.0')
  .addTag('cats')
  .addBearerAuth()
  .addBasicAuth()
  .build();
 const catDocumentFactory = () => SwaggerModule.createDocument(app,catOptions,{
  include: [CatsModule],
  extraModels : [ShowCatResponse],
 });

 const dogOptions = new DocumentBuilder()
 .setTitle('dog API')
 .setDescription('dog API description')
 .setVersion('1.0')
 .addTag('cats')
 .addBearerAuth()
 .addBasicAuth()
 .build();
 const dogDocumentFactory = () => SwaggerModule.createDocument(app, dogOptions,{
  include: [ DogsModule]
 });


SwaggerModule.setup('api/cat', app, catDocumentFactory,{
  jsonDocumentUrl : '/api/cats/swagger.json'
}
);
SwaggerModule.setup('api/dog', app, dogDocumentFactory,{
  jsonDocumentUrl : '/api/dogs/swagger.json'
}
);

SwaggerModule.setup('api',app,document,{

  explorer : true,
  swaggerOptions : {
    urls : [
      {
        name : '1. API',
        url: 'api/swagger.json'
      },
      {
        name : '2. Cats API',
        url : 'api/cats/swagger.json',
      },
      {
        name : '3. Dogs API',
        url : 'api/dogs/swagger.json',
      }

    ]
  },
  jsonDocumentUrl: '/api/swagger.json',
  });
}

function configPipe(app : INestApplication<any>){

  app.useGlobalPipes(new ValidationPipe({
    transform : true,
  }));
}