import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Food } from './food.model';
import { FoodService } from './food.service';
import { FoodCreateInput, FoodUpdateInput } from './food.input';

@Resolver()
export class FoodResolver {
  constructor(private readonly foodService: FoodService) {}
  // TODO: これはデバッグ用です
  @Query(() => [Food], { name: 'foods' })
  findAll(): Promise<Food[]> {
    return this.foodService.findAll();
  }

  @Query(() => [Food], { name: 'createList' })
  createList(@Args('user_id') user_id: string): Promise<Food[]> {
    return this.foodService.createList(user_id);
  }

  @Mutation(() => Food, { name: 'addFood' })
  addFood(@Args('food_data') food_data: FoodCreateInput): Promise<Food> {
    return this.foodService.addFood(food_data);
  }

  @Mutation(() => Food, { name: 'updateFood' })
  updateFood(@Args('id') id: number, @Args('update_data') update_data: FoodUpdateInput): Promise<Food> {
    return this.foodService.updateFood(id, update_data);
  }

  @Mutation(() => [Food], { name: 'deleteFood' })
  deleteFood(@Args('user_id') user_id: string): Promise<Promise<Food>[]> {
    return this.foodService.deleteFood(user_id);
  }
}
