import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RestaurantsService } from './restaurants.service';
import { RestaurantsResolver } from './restaurants.resolver';
import { Restaurant } from './restaurant.entity';
import { Food } from 'src/foods/food.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Food])],
  providers: [RestaurantsService, RestaurantsResolver],
  exports: [RestaurantsService],
})
export class RestaurantsModule {}
