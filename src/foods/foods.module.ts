import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FoodsService } from './foods.service';
import { FoodsResolver } from './foods.resolver';
import { Food } from './food.entity';
import { Restaurant } from 'src/restaurants/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Food, Restaurant])],
  providers: [FoodsResolver, FoodsService],
  exports: [FoodsService],
})
export class FoodsModule {}
