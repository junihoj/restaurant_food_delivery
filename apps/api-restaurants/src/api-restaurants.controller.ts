import { Controller, Get } from '@nestjs/common';
import { ApiRestaurantsService } from './api-restaurants.service';

@Controller()
export class ApiRestaurantsController {
  constructor(private readonly apiRestaurantsService: ApiRestaurantsService) {}

  @Get()
  getHello(): string {
    return this.apiRestaurantsService.getHello();
  }
}
