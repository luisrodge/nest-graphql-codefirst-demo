import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Restaurant } from 'src/restaurants/restaurant.entity';

@Entity()
@ObjectType()
export class Food {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field(() => Int)
  restaurantId: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.foods)
  @Field(() => Restaurant)
  restaurant: Restaurant;
}
