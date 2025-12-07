import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   app.enableCors();
   app.useGlobalPipes(
      new ValidationPipe({
         whitelist: true,
         forbidNonWhitelisted: true,
         transform: true,
      }),
   );
   const config = new DocumentBuilder()
      .setTitle('GDASH Weather Monitor')
      .setDescription(
         'API de monitoramento climático e espacial para o desafio GDASH.',
      )
      .setVersion('1.0')
      .addTag('Clima')
      .addTag('Usuários')
      .addTag('NASA')
      .addBearerAuth()
      .build();

   const document = SwaggerModule.createDocument(app, config);

   SwaggerModule.setup('docs', app, document);

   await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
   console.error('Erro ao iniciar o servidor:', err);
   process.exit(1);
});
