import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Food } from 'src/foods/food.entity';

@Entity()
@ObjectType()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  address?: string;

  @OneToMany(() => Food, (food) => food.restaurant)
  @Field(() => [Food], { nullable: true })
  foods?: Food[];
}
