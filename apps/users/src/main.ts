import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(UsersModule);
  app.useStaticAssets(join(__dirname, "..", 'public'));
  app.setBaseViewsDir(join(__dirname, "..",))
  app.setViewEngine("ejs");
  const configService = app.get(ConfigService);
  const CLIENT_URL = configService.get<number>('APP_PORT', 3000);
  const whitelist = [`${process.env.CLIENT_SIDE_URI}`]
  app.enableCors({
    origin: process.env.NODE_ENV !== "production" ? "*" : function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
  })
  await app.listen(4001);
}
bootstrap();
