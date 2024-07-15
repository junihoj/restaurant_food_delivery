import { NestFactory } from '@nestjs/core';
import { ApiRestaurantsModule } from './api-restaurants.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiRestaurantsModule);
  await app.listen(3000);
}
bootstrap();
