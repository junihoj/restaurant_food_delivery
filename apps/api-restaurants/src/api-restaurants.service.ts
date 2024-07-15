import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiRestaurantsService {
  getHello(): string {
    return 'Hello World!';
  }
}
