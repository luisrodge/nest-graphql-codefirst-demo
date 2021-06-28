import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Food } from 'src/foods/food.entity';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { Restaurant } from './restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantsRepository: Repository<Restaurant>,
    @InjectRepository(Food)
    private foodsRepository: Repository<Food>,
  ) {}

  create(createRestaurantInput: CreateRestaurantInput): Promise<Restaurant> {
    const newRestaurant = this.restaurantsRepository.create(
      createRestaurantInput,
    );
    return this.restaurantsRepository.save(newRestaurant);
  }

  async findAll(): Promise<Restaurant[]> {
    return await this.restaurantsRepository.find();
  }

  async findOne(id: number): Promise<Restaurant> {
    return await this.restaurantsRepository.findOneOrFail(id);
  }

  async findFoods(restaurantId: number): Promise<Food[]> {
    return this.foodsRepository.find({ where: { restaurantId } });
  }
}
