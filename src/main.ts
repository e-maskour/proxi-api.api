import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import validationOptions from './utils/validation-options';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService);

  app.enableShutdownHooks();
  app.setGlobalPrefix(configService.get('app.apiPrefix'), {
    exclude: ['/'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe(validationOptions));

  const options = new DocumentBuilder()
    .setTitle('Proxi Flow API')
    .setDescription('Proxi Flow API description')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get('app.port'));
}

void bootstrap();
