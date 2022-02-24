import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Food } from './food.model';
import { FoodCreateInput, FoodUpdateInput } from './food.input';

@Injectable()
export class FoodService {
  constructor(private readonly prisma: PrismaService) {}
  // TODO: これはデバッグ用です
  async findAll(): Promise<Food[]> {
    return this.prisma.food.findMany();
  }

  async createList(user_id: string): Promise<Food[]> {
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
