import { Controller, Get } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

@Controller()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  getHello(): string {
    return this.restaurantService.getHello();
  }
}
