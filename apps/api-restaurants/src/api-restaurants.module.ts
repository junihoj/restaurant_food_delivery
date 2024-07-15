import { Module } from '@nestjs/common';
import { ApiRestaurantsController } from './api-restaurants.controller';
import { ApiRestaurantsService } from './api-restaurants.service';

@Module({
  imports: [],
  controllers: [ApiRestaurantsController],
  providers: [ApiRestaurantsService],
})
export class ApiRestaurantsModule {}
