import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Restaurant } from 'src/restaurants/restaurant.entity';
import { CreateFoodInput } from './dto/create-food.input';
import { UpdateFoodInput } from './dto/update-food.input';
import { Food } from './food.entity';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food) private foodsRepository: Repository<Food>,
    @InjectRepository(Restaurant)
    private restaurantsRepository: Repository<Restaurant>,
  ) {}

  create(createFoodInput: CreateFoodInput) {
    const newFood = this.foodsRepository.create(createFoodInput);

    return this.foodsRepository.save(newFood);
  }

  findAll() {
    return this.foodsRepository.find();
  }

  findOne(id: number) {
    return this.foodsRepository.findOneOrFail(id);
  }

  findByRestaurant(restaurantId: number) {
    return this.foodsRepository.find({ where: { restaurantId } });
  }

  update(id: number, updateFoodInput: UpdateFoodInput) {
    return `This action updates a #${id} food`;
  }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }

  getRestaurant(restaurantId: number): Promise<Restaurant> {
    return this.restaurantsRepository.findOne(restaurantId);
  }
}
