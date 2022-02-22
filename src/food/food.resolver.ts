import { Resolver, Query } from '@nestjs/graphql';
import { Food } from './food.model';
import { FoodService } from './food.service';

@Resolver()
export class FoodResolver {
  constructor(private readonly foodService: FoodService) {}

  @Query(() => [Food], { name: 'foods' })
  findAll() {
    return this.foodService.findAll();
  }
}
