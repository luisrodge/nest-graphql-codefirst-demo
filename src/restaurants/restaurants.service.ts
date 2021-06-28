import { Injectable } from '@nestjs/common';
import { Restaurant } from './restaurant.entity';

@Injectable()
export class RestaurantsService {
  async findAll(): Promise<Restaurant[]> {
    const restaurant = new Restaurant();
    restaurant.id = 1;
    restaurant.name = 'Pizza Hut';

    return [restaurant];
  }
}
