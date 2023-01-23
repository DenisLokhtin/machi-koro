import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };

  const config = new DocumentBuilder()
    // .addBearerAuth({
    //   type: 'http',
    //   scheme: 'bearer',
    //   bearerFormat: 'JWT',
    //   in: 'header',
    // })
    .setTitle('Machi-Koro')
    .setDescription('Machi-Koro documentation')
    .build();
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('docs', app, document);

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');

  await app.listen(PORT || 8010, () => {
    Logger.log(
      `Server started on PORT ${PORT}`,
      `http://localhost:${PORT}/docs`,
    );
  });
}
bootstrap();
