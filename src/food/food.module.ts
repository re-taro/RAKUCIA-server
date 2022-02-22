import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { FoodResolver } from './food.resolver';
import { FoodService } from './food.service';

@Module({
  imports: [PrismaModule],
  providers: [FoodResolver, FoodService],
})
export class FoodModule {}
