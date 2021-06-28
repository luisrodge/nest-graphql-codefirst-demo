import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantInput } from './dto/input/create-restaurant.input';

import { Restaurant } from './restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantsRepository: Repository<Restaurant>,
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
}
