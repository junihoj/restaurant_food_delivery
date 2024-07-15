import { NestFactory } from '@nestjs/core';
import { RestaurantModule } from './restaurant.module';

async function bootstrap() {
  const app = await NestFactory.create(RestaurantModule);
  await app.listen(3000);
}
bootstrap();
