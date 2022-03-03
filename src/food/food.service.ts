import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Food } from './food.model';
import { FoodCreateInput, FoodUpdateInput } from './food.input';
import { validateString } from './food.dto';
import { LinebotService } from '../linebot/linebot.service';

@Injectable()
export class FoodService {
  constructor(private readonly prisma: PrismaService, private readonly linebot: LinebotService) {}

  async createList(user_id: string): Promise<Food[]> {
    const foods = await this.prisma.food.findMany({
      where: {
        user_id,
      },
    });
    const list = foods
      .filter((food) => food.add_to_list === 1)
      .map((food) => food.recipe_material)
      .filter((x, i, self) => self.indexOf(x) === i)
      .join(',')
      .split(',')
      .join('\n');
    const recipe = foods.map((food) => food.recipe_url).join('\n');
    this.linebot.sendShoppingList(user_id, list, recipe);
    return this.prisma.food.findMany({
      where: {
        user_id,
      },
    });
  }

  async addFood(food_data: FoodCreateInput): Promise<Food> {
    return this.prisma.food.create({
      data: food_data,
    });
  }

  async updateFood(id: number, update_data: FoodUpdateInput): Promise<Food> {
    return this.prisma.food.update({
      where: {
        id,
      },
      data: update_data,
    });
  }

  async deleteFood(user_id: string): Promise<Promise<Food>[]> {
    const food = await this.prisma.food.findMany({
      where: {
        user_id,
      },
    });
    return food
      .filter((food) => food.leave_flag === 0 && food.add_to_list === 0)
      .map(async (food) => {
        return await this.prisma.food.delete({
          where: {
            id: food.id,
          },
        });
      });
  }
}
