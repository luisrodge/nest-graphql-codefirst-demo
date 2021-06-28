import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFoodInput {
  @Field()
  name: string;

  @Field(() => Int)
  restaurantId: number;
}
