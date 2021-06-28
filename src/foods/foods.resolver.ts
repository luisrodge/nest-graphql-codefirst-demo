import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';

import { FoodsService } from './foods.service';
import { Food } from './food.entity';
import { CreateFoodInput } from './dto/create-food.input';
import { UpdateFoodInput } from './dto/update-food.input';
import { Restaurant } from 'src/restaurants/restaurant.entity';

@Resolver(() => Food)
export class FoodsResolver {
  constructor(private readonly foodsService: FoodsService) {}

  @Mutation(() => Food)
  createFood(@Args('createFoodInput') createFoodInput: CreateFoodInput) {
    return this.foodsService.create(createFoodInput);
  }

  @Query(() => [Food], { name: 'foods' })
  findAll() {
    return this.foodsService.findAll();
  }

  @Query(() => Food, { name: 'food' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.foodsService.findOne(id);
  }

  @ResolveField(() => Restaurant, { name: 'restaurant' })
  findRestaurant(@Parent() food: Food): Promise<Restaurant> {
    return this.foodsService.getRestaurant(food.restaurantId);
  }

  @Mutation(() => Food)
  updateFood(@Args('updateFoodInput') updateFoodInput: UpdateFoodInput) {
    return this.foodsService.update(updateFoodInput.id, updateFoodInput);
  }

  @Mutation(() => Food)
  removeFood(@Args('id', { type: () => Int }) id: number) {
    return this.foodsService.remove(id);
  }
}
