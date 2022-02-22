import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Food } from './food.model';

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

  async addFood(
    user_id: string,
    recipe_title: string,
    recipe_url: string,
    image_url: string,
    recipe_material: string,
    recipe_indication: string,
    recipe_cost: string,
  ): Promise<Food> {
    return this.prisma.food.create({
      data: {
        user_id,
        recipe_title,
        recipe_url,
        image_url,
        recipe_material,
        recipe_indication,
        recipe_cost,
      },
    });
  }
}
