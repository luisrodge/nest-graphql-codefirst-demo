import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GetRestaurantArgs } from './dto/args/get-restaurant.args';
import { CreateRestaurantInput } from './dto/input/create-restaurant.input';
import { Restaurant } from './restaurant.entity';
import { RestaurantsService } from './restaurants.service';

@Resolver(() => Restaurant)
export class RestaurantsResolver {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Query(() => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantsService.findAll();
  }

  @Query(() => Restaurant, { name: 'restaurant' })
  getRestaurant(
    @Args() getRestaurantArgs: GetRestaurantArgs,
  ): Promise<Restaurant> {
    return this.restaurantsService.findOne(getRestaurantArgs.id);
  }

  @Mutation(() => Restaurant)
  createRestaurant(
    @Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput,
  ): Promise<Restaurant> {
    return this.restaurantsService.create(createRestaurantInput);
  }
}
