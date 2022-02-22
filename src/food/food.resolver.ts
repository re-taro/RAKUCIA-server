import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Food } from './food.model';
import { FoodService } from './food.service';

@Resolver()
export class FoodResolver {
  constructor(private readonly foodService: FoodService) {}
  // TODO: これはデバッグ用です
  @Query(() => [Food], { name: 'foods' })
  findAll(): Promise<Food[]> {
    return this.foodService.findAll();
  }

  @Mutation(() => Food, { name: 'addFood' })
  addFood(
    @Args('user_id') user_id: string,
    @Args('recipe_title') recipe_title: string,
    @Args('recipe_url') recipe_url: string,
    @Args('image_url') image_url: string,
    @Args('recipe_material') recipe_material: string,
    @Args('recipe_indication') recipe_indication: string,
    @Args('recipe_cost') recipe_cost: string,
  ): Promise<Food> {
    return this.foodService.addFood(
      user_id,
      recipe_title,
      recipe_url,
      image_url,
      recipe_material,
      recipe_indication,
      recipe_cost,
    );
  }
}
