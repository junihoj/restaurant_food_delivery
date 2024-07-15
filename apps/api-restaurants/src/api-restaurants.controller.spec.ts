import { Test, TestingModule } from '@nestjs/testing';
import { ApiRestaurantsController } from './api-restaurants.controller';
import { ApiRestaurantsService } from './api-restaurants.service';

describe('ApiRestaurantsController', () => {
  let apiRestaurantsController: ApiRestaurantsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiRestaurantsController],
      providers: [ApiRestaurantsService],
    }).compile();

    apiRestaurantsController = app.get<ApiRestaurantsController>(ApiRestaurantsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(apiRestaurantsController.getHello()).toBe('Hello World!');
    });
  });
});
