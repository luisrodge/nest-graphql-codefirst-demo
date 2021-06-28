import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { GetRestaurantArgs } from './dto/get-restaurant.args';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { Restaurant } from './restaurant.entity';
import { RestaurantsService } from './restaurants.service';
import { Food } from 'src/foods/food.entity';

@Resolver(() => Restaurant)
export class RestaurantsResolver {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Query(() => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantsService.findAll();
  }

  @Query(() => Restaurant, { name: 'restaurant' })
  findRestaurant(
    @Args() getRestaurantArgs: GetRestaurantArgs,
  ): Promise<Restaurant> {
    return this.restaurantsService.findOne(getRestaurantArgs.id);
  }

  @ResolveField(() => [Food], { name: 'foods' })
  findFoods(@Parent() restaurant: Restaurant): Promise<Food[]> {
    return this.restaurantsService.findFoods(restaurant.id);
  }

  @Mutation(() => Restaurant)
  createRestaurant(
    @Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput,
  ): Promise<Restaurant> {
    return this.restaurantsService.create(createRestaurantInput);
  }
}
